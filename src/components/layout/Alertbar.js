import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
// import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const Alertbar = ({ alerts }) => {
  const classes = useStyles();
  return (
    <Fragment>
      {alerts !== null &&
        alerts.length > 0 &&
        alerts.map((alert) => {
          return (
            <div key={alert.id} className={classes.root}>
              <Snackbar open={alert.on}>
                <Alert severity={`${alert.alertType}`}>{alert.msg}</Alert>
              </Snackbar>
            </div>
          );
        })}
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    alerts: state.alert,
  };
};

export default connect(mapStateToProps)(Alertbar);
