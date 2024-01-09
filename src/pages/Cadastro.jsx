import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Cadastro = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const navigate = useNavigate();

  const validateName = () => {
    if (!name) {
      setNameError("Por favor, insira seu nome");
    } else {
      setNameError("");
    }
  };

  const validateEmail = () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
      setEmailError("Endereço de email inválido");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = () => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(
        "A senha deve ter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula e um número."
      );
    } else {
      setPasswordError("");
    }
  };

  const validateConfirmPassword = () => {
    if (password !== confirmPassword) {
      setConfirmPasswordError("As senhas não coincidem");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleRegistrationClick = async (e) => {
    e.preventDefault();

    validateName();
    validateEmail();
    validatePassword();
    validateConfirmPassword();

    if (!nameError && !emailError && !passwordError && !confirmPasswordError) {
      try {
        await registerUserOnServer(name, email, password);
        navigate("/");
      } catch (error) {
        console.error("Registration failed:", error.message);
      }
    }
  };

  const registerUserOnServer = async (name, email, password) => {
    const response = await fetch("http://localhost:3000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    if (!response.ok) {
      const errorMessage = await response.text();
      console.error("Registration failed:", errorMessage);
      throw new Error(`Falha no cadastro: ${errorMessage}`);
    }
    const user = await response.json();
    return user;
  };

  return (
    <section className="flex items-center justify-center h-[100vh]">
      <div className="flex flex-col items-center cover">
        <h2 className="m-[1rem] text-[30px]">Cadastre-se</h2>
        <form
          className="flex flex-col gap-2 w-[100%] max-w-[100%]"
          onSubmit={handleRegistrationClick}
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Nome</label>
            <input
              id="name"
              className={`p-[10px] outline-0 rounded bg-inptcl text-black ${nameError && "border-red-500"}`}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={validateName}
            />
            {nameError && <span className="text-red-500">{nameError}</span>}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              className={`p-[10px] outline-0 rounded bg-inptcl text-black ${emailError && "border-red-500"}`}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={validateEmail}
            />
            {emailError && <span className="text-red-500">{emailError}</span>}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password">Senha:</label>
            <input
              id="password"
              className={`p-[10px] outline-0 rounded bg-inptcl text-black ${passwordError && "border-red-500"}`}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={validatePassword}
            />
            {passwordError && <span className="text-red-500">{passwordError}</span>}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="confirmPassword">Confirmar Senha:</label>
            <input
              id="confirmPassword"
              className={`p-[10px] outline-0 rounded bg-inptcl text-black ${confirmPasswordError && "border-red-500"}`}
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onBlur={validateConfirmPassword}
            />
            {confirmPasswordError && <span className="text-red-500">{confirmPasswordError}</span>}
          </div>

          <div className="bg-btcl flex justify-center items-center cursor-pointer rounded p-[10px] mt-5 text-white">
            <button type="submit">Cadastre-se</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Cadastro;
