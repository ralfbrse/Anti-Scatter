import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
/*
    This is the home page of the application. It is a protected route, which means that the user can only access it if he/she is logged in.
*/

const Home = () => {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    const [username, setUsername] = useState("");
    const [quotes, setQuotes] = useState([]);
    const [quote, setQuote] = useState("");

    useEffect(() => {
        const verifyCookie = async () => {
        if (!cookies.token) {
            navigate("/login");
        }
        const { data } = await axios.post(
            "http://localhost:4000",
            {},
            { withCredentials: true }
        );
        const { status, user } = data;
        setUsername(user);
        return status
            ? toast(`Hello ${user}`, {
                position: "top-right",
            })
            : (removeCookie("token"), navigate("/login"));
        };
        verifyCookie();
    }, [cookies, navigate, removeCookie]);
    const Logout = () => {
        removeCookie("token");
        navigate("/signup");
    
    };
    const getRandomQuotes = () => {
        setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
      };
    
      useEffect(() => {
        fetch('https://type.fit/api/quotes')
          .then((resp) => resp.json())
          .then((data) => {
            setQuotes(data);
            setQuote(data[Math.floor(Math.random() * data.length)]);
          });
      }, []);
    
      return (
        <>
          <div className="home_page">
            <h4>
              {" "}
              Welcome <span>{username}</span>
            </h4>
            <button onClick={Logout}>LOGOUT</button>
          </div>
          <div className="quote-container">
            <h1>Random Quote</h1>
            <blockquote>{quote.text}</blockquote>
            <p>- {quote.author || 'Unknown'}</p>
            <button onClick={getRandomQuotes}>Get Another Quote</button>
          </div>
          <ToastContainer />
        </>
      );
    };
    
    export default Home;