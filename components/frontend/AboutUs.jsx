import React from "react";

const AboutUs = () => {
  return (
    <div id="about-us" className="dark:bg-gray-700" style={aboutUsStyle}>
      <h2>About Us</h2>
      <p>
        Welcome to Green Harvest, your one-stop destination for all things
        organic!
      </p>
      <p>
        At Green Harvest, we are committed to providing high-quality organic
        products to our customers. We believe in sustainable farming practices
        that promote environmental conservation and support local farmers.
      </p>
      <p>
        Our mission is to promote a healthier lifestyle by offering a wide range
        of organic products, including fruits, vegetables, grains, and more. We
        prioritize transparency and traceability, ensuring that our customers
        can trust the origin and quality of our products.
      </p>
      <p>Thank you for choosing Green Harvest for your organic needs!</p>
    </div>
  );
};

const aboutUsStyle = {
  padding: "20px",
  borderRadius: "5px",
  marginTop: "20px",
  marginBottom: "20px",
};

export default AboutUs;
