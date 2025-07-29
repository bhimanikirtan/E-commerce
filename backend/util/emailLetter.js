export const emailLetter = ({ subject, message, title }) => {
  return `
  <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
    <div style="max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px;">
      <div style="background-color: #f4f4f4; padding: 20px; text-align: center;">
        <h1 style="margin: 0;">SHOP.IN</h1>
      </div>

      <div style="padding: 20px;">
        <h3>${subject}</h3>
        <h2 style="color:#FF0000">${title}</h2>
        <p>${message}</p>
      </div>

      <div style="background-color: #f4f4f4; padding: 10px; text-align: center; font-size: 12px; color: #777;">
        © ${new Date().getFullYear()} SHOP.IN. All rights reserved.
      </div>
    </div>
  </div>
  `;
};
