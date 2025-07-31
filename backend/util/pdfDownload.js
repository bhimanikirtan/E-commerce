const puppeteer = require("puppeteer");
const fs = require("fs");
const Handlebars = require("handlebars");

async function generatePDF(order, outputPath) {
  const htmlTemplate = fs.readFileSync("./invoice-template.html", "utf8");
  const template = Handlebars.compile(htmlTemplate);

  const html = template({
    fullName: order.userId.fullName,
    email: order.userId.email,
    address: order.info.address,
    city: order.info.city,
    pincode: order.info.pincode,
    state: order.info.state,
    country: order.info.country,
    orderDate: new Date(order.createdAt).toLocaleString(),
    total: order.total,
    status: order.status,
    paymentMode: order.paymentDetail.paymentMode,
    paymentId: order.paymentDetail.paymentIntentId,
    paymentStatus: order.paymentDetail.paymentStatus,
    products: order.orderData.products.map((p) => ({
      name: p.productId.name,
      quantity: p.quantity,
      size: p.size,
      color: p.color,
      price: p.productId.price,
    })),
    year: new Date().getFullYear(),
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setContent(html, { waitUntil: "networkidle0" });
  await page.pdf({ path: outputPath, format: "A4", printBackground: true });

  await browser.close();
}

module.exports = generatePDF;
