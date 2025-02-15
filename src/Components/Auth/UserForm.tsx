"use client";
import {
  CreateAccount,
  DontHaveAccount,
  EmailAddress,
  ForgotPassword,
  Href,
  OrSignInWith,
  Password,
  RememberPassword,
  SignIn,
  SignInToAccount,
} from "@/Constant";
import { signIn } from "next-auth/react";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import imageOne from "../../../public/assets/images/logo/logo-1.png";
import imageTwo from "../../../public/assets/images/logo/logo.png";
import { UserSocialApp } from "./UserSocialApp";

const UserForm = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("testuser@example.com");
  const [password, setPassword] = useState("securepassword");
  const router = useRouter();

  const formSubmitHandle = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/auth/login", {
        email,
        password,
      });
      if (response.status === 200) {
        switch (response.data.response) {
          case "successful":
            const token = response.data.token; 
            const sessionData = {
              user: {
                id: response.data.result[0].id,
                email: response.data.result[0].email
              },
              token : response.data.token,
            }
            if (token) {
              sessionStorage.setItem("authSession", JSON.stringify(sessionData));
              toast.success(response.data.message);
              router.push("/Dashboard");
            }
            break;

          case "error":
            toast.error(response.data.message);
            console.log(response);
            break;

          case "info":
            toast.error(response.data.message);
            break;

          default:
            break;
        }
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div>
      <div>
        <Link className="logo" href="/dashboard/default">
          <Image
            priority
            width={100}
            height={34}
            className="img-fluid for-light"
            src={imageOne}
            alt="login page"
          />
          <Image
            priority
            width={100}
            height={34}
            className="img-fluid for-dark"
            src={imageTwo}
            alt="login page"
          />
        </Link>
      </div>
      <div className="login-main">
        <Form
          className="theme-form"
          onSubmit={(event) => formSubmitHandle(event)}
        >
          <h4>{SignInToAccount}</h4>
          <p>{"Enter your email & password to login"}</p>
          <FormGroup>
            <Label className="col-form-label">{EmailAddress}</Label>
            <Input
              type="email"
              defaultValue={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Test123@gmail.com"
            />
          </FormGroup>
          <FormGroup>
            <Label className="col-form-label">{Password}</Label>
            <div className="form-input position-relative">
              <Input
                type={show ? "text" : "password"}
                defaultValue={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Test@123"
              />
              <div className="show-hide" onClick={() => setShow(!show)}>
                <span className="show" />
              </div>
            </div>
          </FormGroup>
          <div className="form-group mb-0">
            <div className="checkbox p-0">
              <Input id="checkbox1" type="checkbox" />
              <Label className="text-muted" htmlFor="checkbox1">
                {RememberPassword}
              </Label>
            </div>
            <Link className="link" href={Href}>
              {ForgotPassword}?
            </Link>
            <div className="text-end mt-3">
              <Button type="submit" color="primary" block>
                {SignIn}
              </Button>
            </div>
          </div>
          <h6 className="text-muted mt-4 or">{OrSignInWith}</h6>
          <UserSocialApp />
          <p className="mt-4 mb-0 text-center">
            {DontHaveAccount}
            <Link className="ms-2" href={Href}>
              {CreateAccount}
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
};
export default UserForm;
