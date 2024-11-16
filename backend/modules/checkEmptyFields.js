function checkEmptyFields(fields) {
  return Object.values(fields).some((value) => {
    return !value || (typeof value === "string" && value.trim() === "");
  });
}

module.exports = { checkEmptyFields };
