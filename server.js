var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var indexRouter = require("./routes/index");
var bookingRouter = require("./routes/bookings");
var driverRouter = require("./routes/driver");
var adminRouter = require("./routes/admin");

require("dotenv").config();
require("./client/mongo");

var app = express();

// view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/booking", bookingRouter);
app.use("/driver", driverRouter);
app.use("/admin", adminRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // use the actual error status or fallback to 500
    const status = err.status || 500;

    res.status(status).json({
        error: {
            message: err.message,
            ...(req.app.get("env") === "development" && { stack: err.stack }),
        },
    });
});

module.exports = app;
