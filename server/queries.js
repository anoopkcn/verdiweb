const os = require("os");
const fs = require("fs");
const { Pool } = require("pg");

const HOME_DIR = os.homedir();
const CONFIG_FILE = `${HOME_DIR}/.mse`;
var db =null;

function readConfig() {
  let fd;
  var py_config
  try {
    fd = fs.openSync(CONFIG_FILE, 'wx+');
    fs.appendFileSync(fd, `{ "python_env": "${HOME_DIR}/.virtualenvs/aiida", "aiida_config": "${HOME_DIR}/.aiida/config.json" }`, 'utf8');
  } catch (err) {
    //console.log('Config file already exists')
  } finally {
    if (fd !== undefined) fs.closeSync(fd);
  }
  var data = fs.readFileSync(CONFIG_FILE, "utf-8");
  if (data) {
    try {
      py_config = JSON.parse(data);
    } catch (e) {
      py_config = null
      alert(e);
    }
  }
  return py_config
}

var py_config = readConfig()
const VERDI = py_config ? `${py_config['python_env']}/bin/verdi` : null;
const AIIDA_CONFIG_FILE = py_config ? `${py_config['aiida_config']}` : null;

var data;
if (AIIDA_CONFIG_FILE) {
  data = fs.readFileSync(AIIDA_CONFIG_FILE, "utf-8");
} else {
  data = null;
}
const db_profile = data ? JSON.parse(data) : null;

const pool = new Pool({
user: db_profile.profiles[db_profile.default_profile].AIIDADB_USER,
host: db_profile.profiles[db_profile.default_profile].AIIDADB_HOST,
database: db_profile.profiles[db_profile.default_profile].AIIDADB_NAME,
password: db_profile.profiles[db_profile.default_profile].AIIDADB_PASS,
port: db_profile.profiles[db_profile.default_profile].AIIDADB_PORT
});


const dbnodes = (request, response) => {
    pool.query('SELECT * FROM db_dbnode ORDER BY id DESC LIMIT 1000', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

const dbnode = (request, response) => {
const id = parseInt(request.params.id)

pool.query('SELECT * FROM db_dbnode WHERE id = $1', [id], (error, results) => {
    if (error) {
    throw error
    }
    response.status(200).json(results.rows)
})
}

  module.exports = {
    dbnodes,
    dbnode
  }