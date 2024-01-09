import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/login.css";
import "../App.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleCreateAccountClick = () => {
    navigate("/cadastro");
  };

  const validateEmailAndPassword = () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    setEmailError(emailRegex.test(email) ? "" : "Endereço de email inválido");
    setPasswordError(
      passwordRegex.test(password)
        ? ""
        : "A senha deve atender aos critérios"
    );
  };

  const handleLogin = async () => {
    try {
      validateEmailAndPassword();

      if (!emailError && !passwordError) {
        await authenticateUserOnServer(email, password);
        navigate("/inicio");
      }
    } catch (error) {
      console.error("Authentication failed:", error);
    }
  };

  const authenticateUserOnServer = async (email, password) => {
    const response = await fetch("https://api-avisaiback.vercel.app/auth/authenticate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Authentication failed");
    }

    const user = await response.json();


    const token = user.token;
    const userName = user.user.name;


    localStorage.setItem('token', token);
    localStorage.setItem('userName', userName);

    console.log("Token:", token);
    return user;
  };
  return (
    <section className="flex items-center justify-center h-[100vh]">
      <div className="flex flex-col items-center cover">
        <h2 className="m-[1rem] text-[30px]">Faça seu login</h2>
        <form
          className="flex flex-col gap-2 w-[100%] max-w-[100%]"
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
          method="post"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="">Email</label>
            <input
              className={`p-[10px] outline-0 rounded bg-inptcl text-black ${emailError && 'border-red-500'}`}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={validateEmailAndPassword}
            />
            {emailError && <span className="text-red-500">{emailError}</span>}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="">Senha:</label>
            <input
              className={`p-[10px] outline-0 rounded bg-inptcl text-black ${passwordError && 'border-red-500'}`}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={validateEmailAndPassword}
            />
            {passwordError && <span className="text-red-500">{passwordError}</span>}
          </div>

          <div className=" bg-btcl flex justify-center items-center cursor-pointer rounded p-[10px] mt-5 text-white">
            <button type="submit">Login</button>
          </div>

          <fieldset className="border-t border-black mt-[10px]">
            <legend className="mx-auto px-4 text-black text-1xl italic">
              ou
            </legend>

            <legend
              className="text-black flex justify-center cursor-pointer"
              onClick={handleCreateAccountClick}
            >
              Crie sua conta
            </legend>

            <div className="text-black pt-4">Acesse com o seu:</div>
          </fieldset>

          <button
            type="button"
            className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
          >
            <svg
              className="w-4 h-4 mr-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 19"
            >
              <path
                fillRule="evenodd"
                d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                clipRule="evenodd"
              />
            </svg>
            Entrar com Google
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;
