export function flattenObject(ob) {
    var toReturn = {};

    for (var i in ob) {
        if (!ob.hasOwnProperty(i)) continue;

        if ((typeof ob[i]) == 'object') {
            var flatObject = flattenObject(ob[i]);
            for (var x in flatObject) {
                if (!flatObject.hasOwnProperty(x)) continue;

                toReturn[i + '.' + x] = flatObject[x];
            }
        } else {
            toReturn[i] = ob[i];
        }
    }
    return toReturn;
};



export function pathFromHash(hash) {
    var repo_uri = "file:///Users/chand/.aiida/repository/spex-develop"
    var tree0 = hash.slice(0, 2)
    var tree1 = hash.slice(2, 4)
    var tree2 = hash.slice(4)
    var path = `${tree0}/${tree1}/${tree2}/path`
    var repository = repo_uri.slice(7)
    var folderPath = `${repository}/repository/node/${path}/`
    return folderPath
}

export function lsLocalDir(path) {
    // return fs.readdirSync(path)
    return ''
}

function createData(property, content) {
    return { property, content };
}

export function pprint(data) {
    var mRows = [];
    var obj = flattenObject(data);
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            mRows.push(createData(key, obj[key]));
        }
    }
    return mRows;
}