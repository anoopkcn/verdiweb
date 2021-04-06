import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Modal from "react-modal";
import NotesIcon from "@material-ui/icons/Notes";
import DeviceHubIcon from "@material-ui/icons/DeviceHub";
import Divider from "@material-ui/core/Divider";
import { pprint } from "./utils"; //catRemoteFile, catLocalFile, 
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Attr } from "./Elements";

import copy from "copy-to-clipboard";

/**
 * AiiDA node REPORT react component
 * @param {object} props [reported message from AiiDA]
 */
function LogData(props) {
  var data = props.data;
  if (data.length !== 0) {
    return data.map(row => (
      <span key={row.id}>
        {row.message}
        <Divider />
      </span>
    ));
  } else {
    return <span>No REPORT associated with this calculation</span>;
  }
}

export function LogButton(props) {
  var rowData = props.data;
  const [data, setData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event, pk) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
    if (pk) getLog(pk);
    setData([]);
  };

  const open = Boolean(anchorEl);

  function getLog(pk) {
    fetch(`/dblog/${pk}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }
  return (
    <React.Fragment>
      <Button
        disableRipple={true}
        onClick={event => handleClick(event, rowData.id)}
      >
        <NotesIcon
          fontSize="small"
          color={
            rowData.node_type.split(".")[0] !== "process"
              ? "disabled"
              : "secondary"
          }
        />
      </Button>
      {rowData.node_type.split(".")[0] === "process" && (
        <Modal style={{ zIndex: 2100 }} isOpen={open}>
          <div style={
            {
              width: '77%',
              position: 'fixed',
              paddingTop: 4,
              paddingBottom: 4,
              backgroundColor: '#ffffff',
              borderBottom: "1px solid #cccccc",
            }}>
            <Button
              disableRipple={true}
              variant="outlined"
              fontSize="small"
              style={{ float: "left" }}
              onClick={handleClick}
            >
              Close
            </Button>
          </div>
          <div style={{ height: 50 }}></div>
          <LogData data={data} />
        </Modal>
      )}
    </React.Fragment>
  );
}

/**
 * Provanance graph or input/output nodes
 * @param {*} props 
 */

function LinkDetails(props) {
  var data = props.data;
  const [metadata, setMetaData] = useState([]);
  const [isLoaded, setLoaded] = useState(false);

  const handleClick = (pk) => {
    if (pk) getMetadata(pk);
    setMetaData([]);
    setLoaded(false);
  };

  function getMetadata(pk) {
    fetch(`/dbnodes/${pk}`)
      .then((res) => res.json())
      .then((data) => {
        setMetaData(data);
        setLoaded(true);
      });

  }

  if (data.length !== 0) {
    return <div style={{ width: "100%" }}>
      <div style={{
        width: "30%",
        float: "left",
        position: "fixed"
      }}>
        <table style={{ width: "100%", textAlign: 'left' }}>
          <thead>
            <tr key={"trhead"}>
              <th key={"label"}>label</th>
              <th key={"input"}>input</th>
              <th key={"output"}>output</th>
              <th key={"type"}>type</th>
            </tr>
          </thead>
          <tbody>
            {data.map(row => (
              <tr key={`tr${row.id}`}>
                <td key={`l${row.id}`} >{row.label}</td>
                <td key={`i${row.id}`} >
                  <Button disableRipple={true} onClick={() => handleClick(row.input_id)} >
                    {row.input_id}
                  </Button>
                </td>
                <td key={`o${row.id}`}>
                  <Button disableRipple={true} onClick={() => handleClick(row.output_id)} >
                    {row.output_id}
                  </Button>
                </td>
                <td key={`t${row.id}`} >{row.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{
        width: "50%",
        float: "right",
        overflowWrap: "break-word",
      }}>
        {isLoaded &&
          <List dense={true}>
            {pprint(metadata[0]).map(row => (
              <ListItem key={"key" + row.property}>
                <ListItemText
                  primary={
                    <span>
                      <span onClick={() => copy(row.content)}>
                        <Attr>{row.property}</Attr>
                      </span>{" "}
                      {row.content}
                    </span>
                  }
                />
              </ListItem>
            ))}
          </List>
        }
      </div>

    </div>
  } else {
    return <span>No nodes associated with this one</span>;
  }
}
export function LinkButton(props) {
  var rowData = props.data;
  const [data, setData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event, pk) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
    if (pk) getLinks(pk);
    setData([]);
  };

  const open = Boolean(anchorEl);

  function getLinks(pk) {
    fetch(`/dblink/${pk}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });

  }
  return (
    <React.Fragment>
      <Button
        disableRipple={true}
        onClick={event => handleClick(event, rowData.id)}
      >
        <DeviceHubIcon fontSize="small" color="secondary" />
      </Button>
      <Modal style={{ zIndex: 2100 }} isOpen={open}>
        <div style={
          {
            width: '77%',
            position: 'fixed',
            paddingTop: 4,
            paddingBottom: 4,
            backgroundColor: '#ffffff',
            borderBottom: "1px solid #cccccc",
          }}>
          <Button
            disableRipple={true}
            variant="outlined"
            fontSize="small"
            style={{ float: "left" }}
            onClick={handleClick}
          >
            Close
            </Button>
        </div>
        <div style={{ height: 50 }}></div>
        <LinkDetails data={data} />
      </Modal>
    </React.Fragment>
  );
}

// Cat output of a file
// function CatData(props) {
//   var data = props.data;
//   if (data.length !== 0) {
//     return data.map((row, index) => (
//       <p style={{ margin: 0 }} key={index}>
//         {row}
//       </p>
//     ));
//   } else {
//     return <span>Loading...</span>;
//   }
// }

// export function CatFile(props) {
//   var fileName = props.data;
//   var computerId = props.computerId;
//   var uuid = props.uuid
//   // var remotePath = props.remotePath;
//   var remoteWorkdir = props.remoteWorkdir;
//   const [data, setData] = useState([]);
//   const [isLoaded, setLoaded] = useState(false);
//   const [anchorEl, setAnchorEl] = useState(null);
//   var hostname;
//   var username;

//   const handleClick = (event) => {
//     setAnchorEl(anchorEl ? null : event.currentTarget);
//     if (remoteWorkdir && fileName) {
//       getTextRemote();
//     } else if (uuid && fileName) {
//       console.log('local')
//       getTextLocal()
//     } else {
//       setData([]);
//       setLoaded(false);
//     }
//   };

//   const open = Boolean(anchorEl);

//   function getTextRemote() {
//     const queryText = `SELECT * FROM public.db_dbauthinfo where dbcomputer_id = ${computerId} order by id desc`;
//     if (!isLoaded) {
//       db.query(queryText, (err, res) => {
//         if (res.rows.length) {
//           hostname = res.rows[0]["auth_params"]["gss_host"];
//           username = res.rows[0]["auth_params"]["username"];
//           setData(catRemoteFile(hostname, username, remoteWorkdir, fileName));
//           setLoaded(true);
//         } else {
//           setData(['This node might be imported from a different database. Computer ID cannot be determined. Please use the terminal'])
//           setLoaded(true);
//         }
//       });
//     }
//   }

//   function getTextLocal() {
//     if (!isLoaded) {
//       setData(catLocalFile(uuid, fileName));
//       setLoaded(true);
//     }
//   }


//   return (
//     <React.Fragment>
//       <Button
//         disableRipple={true}
//         onClick={event => handleClick(event)}
//       >
//         {fileName}
//       </Button>
//       <Modal style={{ zIndex: 2100 }} isOpen={open}>
//         <div style={{ height: 50 }}>
//           <Button
//             disableRipple={true}
//             variant="outlined"
//             fontSize="small"
//             style={{ float: "left" }}
//             onClick={handleClick}
//           >
//             Close
//           </Button>
//         </div>
//         <div style={{ height: "80vh", overflow: "scroll" }}>
//           <CatData data={data} />
//         </div>
//       </Modal>
//     </React.Fragment>
//   );
// }

