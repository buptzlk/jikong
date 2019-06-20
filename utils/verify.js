const verifyTel = (tel) => {
  return /^1\d{10}$/.test(tel);
}

module.exports = {
  verifyTel,
}
