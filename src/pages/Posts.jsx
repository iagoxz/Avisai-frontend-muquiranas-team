import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/NavBar";
import { useNavigate } from "react-router-dom";

const Posts = () => {
  const [productName, setProductName] = useState("");
  const [imageUrl, setimageUrl] = useState("");
  const [productPrice, setproductPrice] = useState("");
  const [productLink, setProductLink] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [posting, setPosting] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const createPost = async () => {
    try {
      const userName = localStorage.getItem("userName");
      
      const truncatedDescription = productDescription.slice(0, 150);

      // Limit product name to 20 characters
      const truncatedProductName = productName.slice(0, 20);

      const response = await axios.post("https://api-avisaiback.vercel.app/post/postagem", {
        userName,
        productName: truncatedProductName,
        productLink,
        productDescription: truncatedDescription,
        favorited: false,
        imageUrl,
        productPrice,
        
      });console.log(response.data);
      console.log("Successfully posted");
      setPosting(response.data);
      navigate("/inicio"); // Use navigate without push
    } catch (error) {
      setError("Error creating post");
      console.error("Error creating post", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div style={{ display: "flex", justifyContent: "center", padding: "3rem 0" }}>
        <div
          style={{
            background: "#630a0a",
            padding: "30px 70px",
            borderRadius: "15px",
          }}
        >
          <h1
            style={{
              fontFamily: "Heebo",
              fontWeight: 800,
              textAlign: "center",
              color: "#fff",
              fontSize: "3rem",
              marginBottom: "5px",
            }}
          >
            Postar
          </h1>
          <div style={{ height: "2px", backgroundColor: "#000000" }}></div>

          <form style={{ marginTop: "25px" }} onSubmit={(e) => e.preventDefault()}>
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "7px",
                  fontSize: "1.2rem",
                  fontFamily: "Poppins",
                  color: "#ffff",
                }}
              >
                Nome do Produto (limite 20 caracteres):
                <input
                  type="text"
                  name="productName"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  style={{
                    width: "100%",
                    color: "#000",
                    borderRadius: "10px",
                    border: "0",
                    outline: "0",
                    fontSize: "1.2rem",
                    paddingLeft: "15px",
                    height: "45px",
                  }}
                />
              </label>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "7px",
                  fontSize: "1.2rem",
                  fontFamily: "Poppins",
                  color: "#ffff",
                }}
              >
                Link do Produto:
                <input
                  type="text"
                  name="productLink"
                  value={productLink}
                  onChange={(e) => setProductLink(e.target.value)}
                  style={{
                    width: "100%",
                    color: "#000",
                    borderRadius: "10px",
                    border: "0",
                    outline: "0",
                    fontSize: "1.2rem",
                    paddingLeft: "15px",
                    height: "45px",
                  }}
                />
              </label>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "7px",
                  fontSize: "1.2rem",
                  fontFamily: "Poppins",
                  color: "#ffff",
                }}
              >
                Url da imagem:
                <input
                  type="text"
                  name="ImageUrl"
                  value={imageUrl}
                  onChange={(e) => setimageUrl(e.target.value)}
                  style={{
                    width: "100%",
                    color: "#000",
                    borderRadius: "10px",
                    border: "0",
                    outline: "0",
                    fontSize: "1.2rem",
                    paddingLeft: "15px",
                    height: "45px",
                  }}
                />
              </label>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "7px",
                  fontSize: "1.2rem",
                  fontFamily: "Poppins",
                  color: "#ffff",
                }}
              >
                Preço do Produto:
                <input
                  type="text"
                  name="productPrice"
                  value={productPrice}
                  onChange={(e) => setproductPrice(e.target.value)}
                  style={{
                    width: "100%",
                    color: "#000",
                    borderRadius: "10px",
                    border: "0",
                    outline: "0",
                    fontSize: "1.2rem",
                    paddingLeft: "15px",
                    height: "45px",
                  }}
                />
              </label>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "7px",
                  fontSize: "1.2rem",
                  color: "#ffff",
                  fontFamily: "Poppins",
                }}
              >
                Descrição do Produto (limite 30 caracteres):
                <textarea
                  name="productDescription"
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                  maxLength={150}
                  style={{
                    width: "100%",
                    borderRadius: "10px",
                    border: "0",
                    outline: "0",
                    fontSize: "1.2rem",
                    paddingLeft: "15px",
                    height: "100px",
                    resize: "none",
                    paddingTop: "10px",
                    color: "#000",
                  }}
                ></textarea>
              </label>
            </div>
            <div style={{ marginTop: "30px", textAlign: "center" }}>
              <button
                onClick={createPost}
                style={{
                  boxShadow: "0px 10px 40px #2b2727",
                  fontFamily: "Heebo",
                  fontWeight: 800,
                  fontSize: "1.3rem",
                  padding: "5px 50px",
                  color: "#fff",
                  backgroundColor: "#111111",
                  border: "0",
                  borderRadius: "10px",
                  cursor: "pointer",
                }}
              >
                Criar Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Posts;