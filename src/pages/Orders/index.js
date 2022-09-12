import React from "react";

import { postBatchretrieve } from "service/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Column,
  Row,
  Text,
  Img,
  Stack,
  SelectBox,
  Button,
  List,
  CheckBox,
} from "components";

const OrdersPage = () => {
  const [apiData, setapiData] = React.useState();
  React.useEffect(() => {
    callApi();
  }, []);

  function callApi() {
    const req = {};

    postBatchretrieve(req)
      .then((res) => {
        setapiData(res);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error integrating API");
      });
  }

  return (
    <>
      <Column className="bg-white_A700 font-poppins items-center mx-[auto] lg:p-[24px] xl:p-[28px] 2xl:p-[32px] 3xl:p-[38px] w-[100%]">
        <Row className="items-center justify-between w-[92%]">
          <Text className="font-medium lg:text-[24px] xl:text-[28px] 2xl:text-[32px] 3xl:text-[38px] text-bluegray_900 w-[auto]">
            Orders
          </Text>
          <Column className="border border-blue_A700 border-solid lg:h-[44px] xl:h-[50px] 2xl:h-[57px] 3xl:h-[68px] items-center px-[4px] rounded-radius50 lg:w-[43px] xl:w-[49px] 2xl:w-[56px] 3xl:w-[67px]">
            <Img
              src="images/img_profileimglarg.png"
              className="lg:h-[38px] xl:h-[43px] 2xl:h-[49px] 3xl:h-[58px] rounded-radius50 lg:w-[37px] xl:w-[42px] 2xl:w-[48px] 3xl:w-[57px]"
              alt="ProfileImgLarg"
            />
          </Column>
        </Row>
        <Stack className="font-opensans 3xl:h-[1023px] lg:h-[663px] xl:h-[758px] 2xl:h-[853px] mb-[4px] lg:mt-[37px] xl:mt-[42px] 2xl:mt-[48px] 3xl:mt-[57px] w-[91%]">
          <Img
            src="images/img_group1.svg"
            className="absolute bottom-[0] lg:h-[546px] xl:h-[625px] 2xl:h-[703px] 3xl:h-[843px] inset-x-[0] w-[100%]"
            alt="GroupOne"
          />
          <Stack className="absolute lg:h-[400px] xl:h-[458px] 2xl:h-[515px] 3xl:h-[618px] right-[0] top-[0] w-[91%]">
            <Row className="absolute bg-white_A700 justify-center left-[3%] lg:p-[21px] xl:p-[24px] 2xl:p-[28px] 3xl:p-[33px] rounded-radius8 w-[97%]">
              <SelectBox
                className="font-semibold lg:mb-[328px] xl:mb-[375px] 2xl:mb-[422px] 3xl:mb-[506px] lg:ml-[554px] xl:ml-[634px] 2xl:ml-[713px] 3xl:ml-[856px] lg:text-[10px] xl:text-[12px] 2xl:text-[14px] 3xl:text-[16px] text-bluegray_600 w-[10%]"
                placeholderClassName="text-bluegray_600"
                name="Group10989"
                placeholder="Filter"
                isSearchable={false}
                isMulti={false}
                indicator={
                  <Img
                    src="images/img_arrowdown.svg"
                    className="lg:w-[8px] lg:h-[4px] lg:mr-[9px] xl:w-[9px] xl:h-[5px] xl:mr-[10px] 2xl:w-[11px] 2xl:h-[6px] 2xl:mr-[12px] 3xl:w-[13px] 3xl:h-[7px] 3xl:mr-[14px]"
                    alt="arrow_down"
                  />
                }
              ></SelectBox>
              <Button
                className="2xl:mb-[422px] 2xl:ml-[10px] 2xl:mr-[88px] 3xl:mb-[506px] 3xl:ml-[12px] 3xl:mr-[105px] flex items-center justify-center lg:mb-[328px] lg:ml-[7px] lg:mr-[68px] text-center w-[13%] xl:mb-[375px] xl:ml-[8px] xl:mr-[78px]"
                rightIcon={
                  <Img
                    src="images/img_upload.svg"
                    className="text-center lg:w-[12px] lg:h-[13px] lg:ml-[7px] xl:w-[14px] xl:h-[15px] xl:ml-[8px] 2xl:w-[16px] 2xl:h-[17px] 2xl:ml-[9px] 3xl:w-[19px] 3xl:h-[20px] 3xl:ml-[10px]"
                    alt="upload"
                  />
                }
              >
                <div className="bg-transparent font-semibold lg:text-[10px] xl:text-[12px] 2xl:text-[14px] 3xl:text-[16px]">
                  Export as PDF{" "}
                </div>
              </Button>
            </Row>
            <Column className="absolute bottom-[5%] font-poppins items-center left-[0] pb-[1px] w-[90%]">
              <Row className="bg-gray_50 items-center justify-end xl:p-[10px] 2xl:p-[12px] 3xl:p-[14px] lg:p-[9px] w-[100%]">
                <div className="bg-white_A700 border-bluegray_50 border-bw083 border-solid lg:h-[16px] xl:h-[18px] 2xl:h-[21px] 3xl:h-[25px] my-[1px] rounded-radius25 lg:w-[15px] xl:w-[17px] 2xl:w-[20px] 3xl:w-[24px]"></div>
                <Text className="font-medium lg:ml-[47px] xl:ml-[54px] 2xl:ml-[61px] 3xl:ml-[73px] lg:text-[14px] xl:text-[16px] 2xl:text-[18px] 3xl:text-[21px] text-bluegray_600 w-[auto]">
                  Id
                </Text>
                <Text className="font-medium lg:ml-[224px] xl:ml-[256px] 2xl:ml-[288px] 3xl:ml-[345px] lg:text-[14px] xl:text-[16px] 2xl:text-[18px] 3xl:text-[21px] text-bluegray_600 w-[auto]">
                  Name
                </Text>
                <Text className="font-medium 3xl:ml-[106px] lg:ml-[69px] xl:ml-[79px] 2xl:ml-[89px] lg:text-[14px] xl:text-[16px] 2xl:text-[18px] 3xl:text-[21px] text-bluegray_600 w-[auto]">
                  Quantity
                </Text>
                <Text className="font-medium lg:ml-[47px] xl:ml-[54px] 2xl:ml-[61px] 3xl:ml-[73px] lg:text-[14px] xl:text-[16px] 2xl:text-[18px] 3xl:text-[21px] text-bluegray_600 w-[auto]">
                  Base Price
                </Text>
                <Text className="font-medium lg:ml-[42px] xl:ml-[48px] 2xl:ml-[54px] 3xl:ml-[64px] lg:mr-[35px] xl:mr-[40px] 2xl:mr-[46px] 3xl:mr-[55px] lg:text-[14px] xl:text-[16px] 2xl:text-[18px] 3xl:text-[21px] text-bluegray_600 w-[auto]">
                  Total Price
                </Text>
              </Row>
              <List
                className="gap-[0] min-h-[auto] lg:mt-[13px] xl:mt-[15px] 2xl:mt-[17px] 3xl:mt-[20px] w-[87%]"
                orientation="vertical"
              >
                {apiData?.orders?.map((apiDataOrdersEle, index) => {
                  return (
                    <React.Fragment key={`apiDataOrdersEle${index}`}>
                      <Row className="justify-between lg:my-[10px] xl:my-[11px] 2xl:my-[13px] 3xl:my-[15px] w-[100%]">
                        <CheckBox
                          checked={apiDataOrdersEle?.id}
                          className="font-normal not-italic lg:text-[12px] xl:text-[14px] 2xl:text-[16px] 3xl:text-[19px] text-bluegray_900"
                          inputClassName="h-[20px] mr-[5px] w-[20px]"
                          name="FJ5I599893830fh One"
                          label="FJ5I599893830fhbevdvcchcnd"
                        ></CheckBox>
                        <Text className="font-normal mt-[2px] not-italic lg:text-[12px] xl:text-[14px] 2xl:text-[16px] 3xl:text-[19px] text-bluegray_900 w-[auto]">
                          Item name
                        </Text>
                        <Text className="font-normal mt-[2px] not-italic lg:text-[12px] xl:text-[14px] 2xl:text-[16px] 3xl:text-[19px] text-bluegray_900 w-[auto]">
                          2344
                        </Text>
                        <Text className="font-normal mt-[2px] not-italic lg:text-[12px] xl:text-[14px] 2xl:text-[16px] 3xl:text-[19px] text-bluegray_900 w-[auto]">
                          $23444
                        </Text>
                        <Text className="font-normal mt-[2px] not-italic lg:text-[12px] xl:text-[14px] 2xl:text-[16px] 3xl:text-[19px] text-bluegray_900 w-[auto]">
                          $23444
                        </Text>
                      </Row>
                    </React.Fragment>
                  );
                })}
              </List>
            </Column>
          </Stack>
        </Stack>
      </Column>

      <ToastContainer />
    </>
  );
};

export default OrdersPage;
