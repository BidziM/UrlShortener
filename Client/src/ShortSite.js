import { useState } from "react";
import "./App.css";
import axios from "axios";
import styled from "styled-components";
import validator from "validator";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Short() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null)
    setShortUrl(null);
    if(url.length === 0) return setError("You Have To Enter The URL");
    if(!validator.isURL(url, {validate_length:false})) {
      
      return setError("URL Is Wrong Check And Past Again");
    }
    axios
      .post("api/v1/url", { url })
      .then(({ data, status }) => {
        const { data: url } = data;
        setShortUrl(url);
      })
      .catch((error) => {
        if(error.response) {
          setError(error.response.data.message)
        }else {
          setError("We Have Trouble To Connect To The Server")
        }
      })
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    displayToast();
  };

  const handleChange = (e) => {
    setUrl(e.target.value);
  };

  const displayToast = () =>
    toast.success("URL Copied To Clipboard", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      toastId: "clipboard",
    });

  const RenderShortUrl = () => (
    <>
      <h1>Here Is Your Short URL</h1>
      <Container>
        <div className="form" onClick={copyToClipboard}>
          <input
            className="pointer"
            type="text"
            value={shortUrl}
          />
          <button>Copy URL</button>
        </div>
        <div>
          <span>Click On URL Or Button And Share It With Co-workers</span>
        </div>
      </Container>
    </>
  );

  return (
    <Section>
      <h1>Paste The URL And Click The Button</h1>
      <Container onSubmit={handleSubmit} error={error}>
        <form className="form">
          <input
            type="text"
            placeholder="Paste the link"
            onChange={handleChange}
          />
          <button>Generate URL</button>
        </form>
        {error && <span className="error">{error}</span>}
      </Container>
      {shortUrl && <RenderShortUrl />}
    </Section>
  );
}

const Section = styled.section`
  margin: 60px auto 20px auto;
  max-width: 758px;
  box-shadow: 0 1px 4px #ccc;
  border-radius: 4px;
  padding: 10px 30px 5px;
  background: #fff;
  text-align: center;
  & > div:last-of-type {
    margin-bottom: 40px;
  }
`;

const Container = styled.div`
  max-width: 648px;
  margin: auto;
  margin: 10px auto 20px;
  text-align: left;
  & .form {
    box-sizing: border-box;
    display: flex;
    position: relative;
    span {
      text-align: left;
      width: 100%;
    }
  }
  & .pointer {
    cursor: pointer;
  }
  input {
    width: 100%;
    height: 56px;
    padding: 10px 16px;
    font: 17px lato, arial;
    color: #000;
    background: #fff;
    border: 1px solid;
    border-color: ${({error}) => error ? "red!important" : "#bbb"};
    border-right: 0;
    border-radius: 3px;
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
    box-sizing: border-box;
    :hover {
      border-color: #2cb7c5;
    }
    :focus-visible {
      border-color: #2cb7c5;
    }
    :focus {
      outline: none;
    }
    
  }
  button {
    height: 56px;
    width: 174px;
    padding: 10px 16px;
    font: bold 16px lato, arial;
    color: #fff;
    background-color: #2cb7c5;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    border: 0;
    border-radius: 3px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    margin-left: -1px;
    margin: 0;
  }
  span {
    font-weight: bold;
  }
  & .error {
    color: red;
  }
`;

export default Short;
