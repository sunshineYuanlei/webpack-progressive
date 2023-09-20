const path = require("path")
const HtmlWebPackPlugin = require("html-webpack-plugin")

const getEntry = (exports.getEntry = async () => {
  const { globbySync } = await import("globby")
  const paths = globbySync("./src", {
    expandDirectories: {
      files: ["*.js"],
    },
  })
  // console.log("paths", paths)
  const rs = {}
  paths.forEach((v) => {
    // console.log("v", v)
    // 计算 filename
    const name = path.basename(v, ".js")
    // console.log("name", name)
    if (!v.startsWith(".")) {
      // 转成相对地址
      v = "./" + v
    }
    // console.log("v2", v)
    rs[name] = v
  })
  console.log("rs", rs)
  return rs
})

const getHtmlWebpackPlugins = (exports.getHtmlWebpackPlugins = async () => {
  const res = await getEntry()
  console.log("res", res)
  const getHtmlWebpackPlugins = Object.keys(res).reduce((plugins, filename) => {
    plugins.push(
      new HtmlWebPackPlugin({
        template: `./templates/${filename}.html`,
        filename: `${filename}.html`,
        chunks: [filename],
      })
    )
    // console.log('plugins', plugins)
    return plugins
  }, [])
  console.log("getHtmlWebpackPlugins", getHtmlWebpackPlugins)
  return getHtmlWebpackPlugins
})
