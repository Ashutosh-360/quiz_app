function successHandler(res, data) {
  res.status(200).send({
    success: true,
    results: data,
  });
}

module.exports = { successHandler };
