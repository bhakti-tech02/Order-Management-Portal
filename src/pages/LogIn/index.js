import React from "react";

import { postLogin } from "service/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import useForm from "hooks/useForm";
import { Column, Text, Stack, Img, Input, Button } from "components";
import * as yup from "yup";

const LogInPage = () => {
  const [apiData1, setapiData1] = React.useState();
  const formValidationSchema = yup
    .object()
    .shape({
      username: yup
        .string()
        .required("Username is required")
        .email("Please enter valid email"),
      password: yup.string().required("Password is required"),
    });
  const form = useForm(
    { username: "", password: "" },
    {
      validate: true,
      validateSchema: formValidationSchema,
      validationOnChange: true,
    }
  );
  const navigate = useNavigate();

  function callApi1(data) {
    const req = { data: { ...data } };

    postLogin(req)
      .then((res) => {
        setapiData1(res);

        navigate("/orders");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Invalid Credentials!");
      });
  }

  return (
    <>
      <Column className="bg-white_A700 font-poppins items-center justify-end mx-[auto] lg:p-[28px] xl:p-[32px] 2xl:p-[36px] 3xl:p-[43px] w-[100%]">
        <Text className="font-medium lg:mt-[60px] xl:mt-[69px] 2xl:mt-[78px] 3xl:mt-[93px] lg:text-[37px] xl:text-[42px] 2xl:text-[48px] 3xl:text-[57px] text-bluegray_900 w-[auto]">
          Order management Portal
        </Text>
        <Stack className="font-gilroy lg:h-[600px] xl:h-[686px] 2xl:h-[772px] 3xl:h-[926px] lg:mt-[41px] xl:mt-[47px] 2xl:mt-[53px] 3xl:mt-[63px] w-[92%]">
          <Img
            src="images/img_group1.svg"
            className="absolute bottom-[0] lg:h-[546px] xl:h-[625px] 2xl:h-[703px] 3xl:h-[843px] w-[100%]"
            alt="GroupOne"
          />
          <Column className="absolute bg-white_A700 items-center justify-end left-[22%] lg:p-[24px] xl:p-[28px] 2xl:p-[32px] 3xl:p-[38px] rounded-radius16 top-[0] w-[47%]">
            <Text className="font-semibold xl:mt-[10px] 2xl:mt-[12px] 3xl:mt-[14px] lg:mt-[9px] lg:text-[24px] xl:text-[28px] 2xl:text-[32px] 3xl:text-[38px] text-bluegray_900 w-[auto]">
              Sign in{" "}
            </Text>
            <Column className="lg:mt-[28px] xl:mt-[32px] 2xl:mt-[36px] 3xl:mt-[43px] w-[100%]">
              <Column className="rounded-radius8 w-[100%]">
                <Text className="font-medium lg:text-[14px] xl:text-[16px] 2xl:text-[18px] 3xl:text-[21px] text-bluegray_900 w-[auto]">
                  Email
                </Text>
                <Input
                  className="font-medium p-[0] lg:text-[12px] xl:text-[14px] 2xl:text-[16px] 3xl:text-[19px] placeholder:text-bluegray_300 text-bluegray_300 w-[100%]"
                  wrapClassName="2xl:mt-[6px] 3xl:mt-[7px] lg:mt-[4px] w-[100%] xl:mt-[5px]"
                  type="email"
                  onChange={(e) => {
                    form.handleChange("username", e.target.value);
                  }}
                  errors={form?.errors?.username}
                  value={form?.values?.username}
                  name="email"
                  placeholder="jane@gmail.com"
                ></Input>
              </Column>
              <Column className="lg:mt-[16px] xl:mt-[18px] 2xl:mt-[21px] 3xl:mt-[25px] rounded-radius8 w-[100%]">
                <Text className="font-medium lg:text-[14px] xl:text-[16px] 2xl:text-[18px] 3xl:text-[21px] text-bluegray_900 w-[auto]">
                  Password
                </Text>
                <Input
                  className="font-medium p-[0] lg:text-[12px] xl:text-[14px] 2xl:text-[16px] 3xl:text-[19px] placeholder:text-bluegray_200 text-bluegray_200 w-[100%]"
                  wrapClassName="2xl:mt-[6px] 3xl:mt-[7px] lg:mt-[4px] w-[100%] xl:mt-[5px]"
                  type="password"
                  onChange={(e) => {
                    form.handleChange("password", e.target.value);
                  }}
                  errors={form?.errors?.password}
                  value={form?.values?.password}
                  name="Group10198"
                  placeholder="Enter Password"
                ></Input>
              </Column>
             
              <Button
                className="common-pointer font-medium lg:mt-[21px] xl:mt-[24px] 2xl:mt-[27px] 3xl:mt-[32px] lg:text-[12px] xl:text-[14px] 2xl:text-[16px] 3xl:text-[19px] text-center w-[100%]"
                onClick={() => {
                  form.handleSubmit(callApi1);
                }}
                size="md"
              >
                Sign in
              </Button>
            </Column>
          </Column>
        </Stack>
      </Column>

      <ToastContainer />
    </>
  );
};

export default LogInPage;
