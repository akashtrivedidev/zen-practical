import express from "express";

const indexRouter = express.Router();

indexRouter.get("/", (req, res) => {
  res.send({ success: "ok" });
});

export default indexRouter;
