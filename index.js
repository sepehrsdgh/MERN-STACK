const fs = require("fs");
const http = require("http");

// const textIn = fs.readFileSync("./txt/input.txt", "utf8");

// // console.log(textIn);

// const textOut = `this is what we know about avocado :${textIn}.\n createdBy:${new Date()}`;
// fs.writeFileSync("./txt/output.txt", textOut);
// console.log("filewritten!");

// console.log(textOut);

// fs.readFile("./txt/startfffffff.txt", "utf-8", (err, data) => {
//   if (!err) {
//     return console.log("blocked!");
//   }
//   fs.readFile(`./txt/${data}.txt`, "utf-8", (err, data) => {
//     console.log(data);
//   });
// });

// console.log("data is reading!please wait...");

// fs.writeFile();

// const readFiles = async () => {
//   try {
//     const data = await fs.readFile("./txt/start.txt");
//     fs.readFile(`./txt/${data}.txt`, "utf-8");
//   } catch (err) {
//     console.log(err);
//   }
// };

// readFiles();
// console.log("data is reading!please wait...");

// fs.readFile();

// fs.writeFile();

// fs.writeFile(
//   "message.txt",
//   "Hello Node.js",
//   { encoding: "utf-8", mode: 0o666, flag: "w" },
//   function (err) {
//     if (err) throw err;
//     console.log("The file has been saved!");
//   }
// );

//http

// fs.readFile(`${__dirname}/dev-data/data.json`, "utf-8", (err, data) => {
//   const productData = JSON.parse(data);
// });

const replaceTemplate = (tempProduct, ele) => {
  let output = tempProduct.replace(/{%PRODUCTNAME%}/g, ele.productName);
  output.replace(/{%IMAGE%}/g, ele.image);
  output.replace(/{%QUANTITY%}/g, ele.quantity);
  output.replace(/{%PRICE%}/g, ele.price);
  output.replace(/{%FROM%}/g, ele.from);
  output.replace(/{%NUTRIENTS%}/g, ele.nutrients);
  output.replace(/{%DESCRIPTION%}/g, ele.description);
  output.replace(/{%ID%}/g, ele.id);
  if (!ele.organic) {
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  }
  return output;
};

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

const dataObject = JSON.parse(data);
console.log(dataObject);

const server = http.createServer((req, res) => {
  const pathName = req.url;
  //OVERVIEW PAGE
  if (pathName === "/overview" || pathName === "/") {
    res.writeHead(200, {
      "content-type": "text/html",
    });

    const cardsHtml = dataObject
      .map(function (ele) {
        return replaceTemplate(tempProduct, ele);
      })
      .join(" ");
    console.log(cardsHtml);
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);

    res.end(output);
  }
  //PRODUCT PAGE
  else if (pathName === "/product") {
    res.end("product");
  }
  //API PAGE
  else if (pathName === "/api") {
    res.writeHead(200, {
      "content-type": "application/json",
    });
    res.end(data);
  }
  //NOT FOUND!
  else {
    res.writeHead(404, {
      "content-type": "text",
    });
    res.end("<h1>page not found!</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("server listening for port 8000");
});
