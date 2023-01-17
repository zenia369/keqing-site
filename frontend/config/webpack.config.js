const createConfig = require("./utils/createConfig");

module.exports = (env) => {
  const mode = env.mode === "dev" ? "development" : "production";

  const createdConfig = createConfig(mode);

  return createdConfig;
};
