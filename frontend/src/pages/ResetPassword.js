import React from "react";
import { useState } from "react";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [data, setData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");
  console.log(token);

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.newPassword !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    const dataResponse = await fetch(
      `${SummaryApi.resetPassword.url}?token=${token}`,
      {
        method: SummaryApi.resetPassword.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const dataApi = await dataResponse.json();
    console.log(dataResponse);
    if (dataApi.success) {
      toast.success("Password reset successfully");
      navigate("/login");
    }
    if (dataApi.status === "error") {
      toast.error("Password reset failed");
    }
  };

  return (
    <div style={styles.container}>
      <main style={styles.main}>
        <div style={styles.card}>
          <div style={styles.cardContent}>
            <div style={styles.header}>
              <h1 style={styles.title}>Reset Password</h1>
            </div>

            <div style={styles.formContainer}>
              <form onSubmit={handleSubmit}>
                <div style={styles.formGroup}>
                  <label htmlFor="newPassword" style={styles.label}>
                    New password
                  </label>
                  <div style={styles.inputContainer}>
                    <input
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      onChange={handleOnChange}
                      value={data.newPassword}
                      style={styles.input}
                      required
                      placeholder="Enter a new password"
                    />
                  </div>
                  <p style={styles.error} id="new-password-error">
                    Please include a password that complies with the rules to
                    ensure security
                  </p>
                </div>
                <div style={styles.formGroup}>
                  <label htmlFor="confirmPassword" style={styles.label}>
                    Confirm new password
                  </label>
                  <div style={styles.inputContainer}>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      onChange={handleOnChange}
                      value={data.confirmPassword}
                      style={styles.input}
                      required
                      placeholder="Enter a new password"
                    />
                  </div>
                  <p style={styles.error} id="confirm-password-error">
                    Please include a password that complies with the rules to
                    ensure security
                  </p>
                </div>
                <button type="submit" style={styles.button}>
                  Reset my password
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  main: {
    width: "100%",
    maxWidth: "480px",
    padding: "1.5rem",
    margin: "0 auto",
  },
  card: {
    backgroundColor: "white",
    border: "1px solid #e2e8f0",
    borderRadius: "1rem",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    marginTop: "1.75rem",
  },
  cardContent: {
    padding: "1rem 1.75rem",
  },
  header: {
    textAlign: "center",
  },
  logoContainer: {
    display: "flex",
    alignItems: "end",
    justifyContent: "center",
    marginBottom: "2rem",
    fontSize: "1.25rem",
    fontWeight: "bold",
  },
  logo: {
    width: "1.5rem",
    height: "1.5rem",
    color: "#6366f1",
  },
  brand: {
    color: "#6366f1",
  },
  title: {
    fontSize: "1.125rem",
    fontWeight: "bold",
    color: "#1a202c",
  },
  formContainer: {
    marginTop: "1.25rem",
  },
  formGroup: {
    marginBottom: "1rem",
  },
  label: {
    display: "block",
    marginBottom: "0.25rem",
    marginLeft: "0.25rem",
    fontSize: "0.75rem",
    fontWeight: "600",
    color: "#4a4a4a",
  },
  inputContainer: {
    position: "relative",
  },
  input: {
    width: "100%",
    padding: "0.75rem 1rem",
    fontSize: "0.875rem",
    border: "2px solid #e2e8f0",
    borderRadius: "0.375rem",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    outline: "none",
    transition: "border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
  },
  inputFocus: {
    borderColor: "#6366f1",
    boxShadow: "0 0 0 3px rgba(99, 102, 241, 0.4)",
  },
  error: {
    display: "none",
    marginTop: "0.5rem",
    fontSize: "0.75rem",
    color: "#f56565",
  },
  button: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    padding: "0.75rem 1rem",
    fontSize: "0.875rem",
    fontWeight: "600",
    color: "white",
    backgroundColor: "#ef4444", // Màu đỏ
    border: "none",
    borderRadius: "0.375rem",
    transition: "background-color 0.2s ease-in-out",
    cursor: "pointer",
  },
  loginContainer: {
    paddingLeft: "1rem",
    paddingRight: "1rem",
    textAlign: "center",
  },
};

export default ResetPassword;
