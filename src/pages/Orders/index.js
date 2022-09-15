import React from "react";
import { orderBy, sortBy } from "lodash";
import jsPDF from "jspdf";
import { ExportJsonCsv } from "react-export-json-csv";
import { useNavigate } from "react-router-dom";


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
  Input,
} from "components";
import { postBatchretrieve } from "service/api";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
const _ = require("lodash");

const OrdersPage = () => {
  const [apiData, setapiData] = React.useState();
  const navigate = useNavigate();

  const [orderInfo, setOrderInfo] = React.useState([]);

  React.useEffect(() => {
    callApi();
  }, []);


  const newData = apiData?.map((x) => x);
  const headers = [
    {
      key: "id",
      name: "Id",
    },
    {
      key: "name",
      name: "Name",
    },
    {
      key: "quantity",
      name: "Quantity",
    },
    {
      key: "b_amount",
      name: "Base Price",
    },
    {
      key: "g_amount",
      name: "Total Price",
    },
  ];

  var data;
  if (orderInfo.length) {
    let orderData = _.map(orderInfo, (val) => {
      val = val;
      var orderData = _.map(apiData, (cdata) => {
        if (val.orders.id == cdata.id) {
          return cdata;
        }
      });
      return _.without(orderData, undefined, null, "", "crap")[0];
    });

    const newOrderData = orderData?.map((x) => x);
    data = newOrderData?.map((x) => ({
      id: x?.id,
      name: x?.line_items[0]?.name,
      quantity: x?.line_items[0]?.quantity,
      b_amount: x?.line_items[0]?.base_price_money?.amount,
      g_amount: x?.line_items[0]?.gross_sales_money?.amount,
    }));
  } else {
    data = newData?.map((x) => ({
      id: x?.id,
      name: x?.line_items[0]?.name,
      quantity: x?.line_items[0]?.quantity,
      b_amount: x?.line_items[0]?.base_price_money?.amount,
      g_amount: x?.line_items[0]?.gross_sales_money?.amount,
    }));
  }

  const handleFilterChange = (currentFilter) => {
    if (currentFilter === "quantity") {
      const orders = apiData?.map((x) => {
        if (x?.line_items) {
          return {
            ...x,
            qty: parseInt(x?.line_items[0]?.quantity),
          };
        }
      });
      const sortedData = sortBy(orders, [
        function (o) {
          return o.qty;
        },
      ]);
      setapiData(sortedData);
    } else if (currentFilter === "amount") {
      const orders = apiData?.map((x) => {
        return x;
      });
      const sortedData = sortBy(orders, [
        function (o) {
          return o?.line_items?.[0]?.gross_sales_money?.amount;
        },
      ]);

      setapiData(sortedData);
    } else {
    }
  };
  function handleNavigate1() {
    navigate("/login");
  }
  function pdfGenerate() {
    if (!orderInfo.length) {
      toast.error("Please select your orders !");
    } else {
      var doc = new jsPDF("landscape", "px", "a4", "false");
      //doc.addPage()

      let y = 60;
      let qty;

      
        orderInfo?.map((x) => {
          return (
            doc.text(5, y, "Order ID:"),
            doc.text(60, y, x?.orders?.id),
            (y = y + 20),
            doc.text(5, y, "Date: "),
            doc.text(60, y, new Date(x?.orders.created_at).toDateString()),
            (y = y + 20),
            doc.text(5, y, "Name: "),
            doc.text(60, y, x?.orders.line_items[0].name),
            (y = y + 20),
            doc.text(5, y, "Base $: "),
            doc.text(
              60,
              y,
              x?.orders.line_items[0].base_price_money.amount.toString()
            ),
            (y = y + 20),
            doc.text(5, y, "Quantity: "),
            doc.text(60, y, x?.orders.line_items[0].quantity),
            (y = y + 20),
            doc.text(5, y, "Total $: "),
            doc.text(
              60,
              y,
              x?.orders.line_items[0].gross_sales_money.amount.toString()
            ),
            (y = y + 20),
            doc.text(
              60,
              y,
              "---------------------------------------------------"
            ),
            (y = y + 20)
          );
        })
      

      doc.save("first.pdf");
    }
  }
  function excelGenerate() {
  }

  function callApi() {
    const req = {};
    postBatchretrieve(req)
      .then((res) => {
        const resOne = res?.orders?.map((x) => {
          return x?.line_items[0]?.quantity;
        });


          res?.orders?.map((x) => {
            return x?.line_items[0]?.quantity;
          })
     
        setapiData(res?.orders);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error Integrating!!");
      });
  }

  return (
    <>
      <Column className="bg-white_A700 font-poppins items-center mx-[auto] lg:p-[24px] xl:p-[28px] p-[32px] 3xl:p-[38px] w-[100%]">
        <Row className="items-center justify-between w-[92%]">
          <Text className="font-medium lg:text-[24px] xl:text-[28px] text-[32px] 3xl:text-[38px] text-bluegray_900 w-[auto]">
            Orders
          </Text>
          <Column className="border border-blue_A700 border-solid lg:h-[44px] xl:h-[50px] h-[56px] 2xl:h-[57px] 3xl:h-[68px] items-center px-[4px] rounded-radius50 lg:w-[43px] xl:w-[49px] w-[56px] 3xl:w-[67px]">
            <Img
              src="images/img_profileimglarg.png"
              className="lg:h-[38px] xl:h-[43px] h-[48px] 2xl:h-[49px] 3xl:h-[58px] rounded-radius50 lg:w-[37px] xl:w-[42px] w-[48px] 3xl:w-[57px]"
              alt="ProfileImgLarg"
            />
          </Column>
        </Row>
        <Stack className="font-opensans 3xl:h-[1023px] lg:h-[663px] xl:h-[758px] h-[852px] 2xl:h-[853px] mb-[4px] lg:mt-[37px] xl:mt-[42px] mt-[48px] 3xl:mt-[57px] w-[91%]">
          <Img
            src="images/img_group1.svg"
            className="absolute bottom-[0] lg:h-[546px] xl:h-[625px] h-[702px] 2xl:h-[703px] 3xl:h-[843px] w-[100%]"
            alt="GroupOne"
          />
          <Column className="absolute bg-white_A700 inset-x-[0] items-end mx-[auto] lg:p-[21px] xl:p-[24px] p-[28px] 3xl:p-[33px] rounded-radius8 top-[0] w-[88%]">
            <Row className="items-center justify-end ml-[auto] w-[44%]">
              <SelectBox
                className="bg-transparent font-semibold lg:text-[10px] xl:text-[12px] text-[14px] 3xl:text-[16px] text-bluegray_600 w-[41%]"
                placeholderClassName="bg-transparent text-bluegray_600"
                name="Group10989"
                placeholder="Filter"
                isSearchable={false}
                isMulti={false}
                indicator={
                  <Img
                    src="images/img_arrowdown.svg"
                    className="w-[11.61px] h-[5.8px] mr-[12px] lg:w-[9px] lg:h-[5px] lg:mr-[9px] xl:w-[10px] xl:h-[6px] xl:mr-[10px] 2xl:w-[11px] 2xl:h-[6px] 3xl:w-[13px] 3xl:h-[7px] 3xl:mr-[14px]"
                    alt="arrow_down"
                  />
                }
                shape="oundedBorder8"
                variant="utlineBluegray50"
                onChange={handleFilterChange}
              ></SelectBox>
              <Button
                className="3xl:ml-[12px] flex items-center justify-center lg:ml-[7px] ml-[10px] text-center w-[45%] xl:ml-[8px]"
                rightIcon={
                  <Img
                    src="images/img_upload.svg"
                    className="w-[16.67 px] h-[16.67px] ml-[9px] text-center lg:w-[12px] lg:h-[13px] lg:ml-[7px] xl:w-[14px] xl:h-[15px] xl:ml-[8px] 2xl:w-[16px] 2xl:h-[17px] 3xl:w-[20px] 3xl:h-[21px] 3xl:ml-[10px]"
                    alt="upload"
                  />
                }
              >
                <div
                  onClick={pdfGenerate}
                  className="bg-transparent font-semibold lg:text-[10px] xl:text-[12px] text-[14px] 3xl:text-[16px]"
                >
                  Export as PDF
                </div>
              </Button>
              <Button
                className="3xl:ml-[12px] flex items-center justify-center lg:ml-[7px] ml-[10px] text-center w-[40%] xl:ml-[8px]"
                rightIcon={
                  <Img
                    src="images/img_upload.svg"
                    className="w-[16.67 px] h-[16.67px] ml-[9px] text-center lg:w-[12px] lg:h-[13px] lg:ml-[7px] xl:w-[14px] xl:h-[15px] xl:ml-[8px] 2xl:w-[16px] 2xl:h-[17px] 3xl:w-[20px] 3xl:h-[21px] 3xl:ml-[10px]"
                    alt="upload"
                  />
                }
              >
                <ExportJsonCsv headers={headers} items={data}>
                  Export CSV
                </ExportJsonCsv>
              </Button>

              <Button
                className="3xl:ml-[12px] flex items-center justify-center lg:ml-[7px] ml-[10px] text-center w-[25%] xl:ml-[8px]"
                onClick={handleNavigate1}
                endIcon={
                  <Img
                    src="images/img_upload.svg"
                    className="w-[16.67 px] h-[16.67px] ml-[9px] text-center lg:w-[12px] lg:h-[13px] lg:ml-[7px] xl:w-[14px] xl:h-[15px] xl:ml-[8px] 2xl:w-[16px] 2xl:h-[17px] 3xl:w-[20px] 3xl:h-[21px] 3xl:ml-[10px]"
                    alt="upload"
                  />
                }
              >
                Log out
              </Button>
            </Row>
            <Row className="bg-gray_50 xl:p-[10px] 2xl:p-[12px] 3xl:p-[14px] lg:p-[9px] w-[100%]">
              <Text className="font-medium text-center lg:text-[14px] xl:text-[16px] 2xl:text-[18px] 3xl:text-[21px] text-bluegray_600 w-[37rem]">
                Id
              </Text>
              <Text className="font-medium text-center lg:text-[14px] xl:text-[16px] 2xl:text-[18px] 3xl:text-[21px] text-bluegray_600 w-[100px]">
                Name
              </Text>
              <Text className="font-medium text-center ml-[50px] lg:text-[14px] xl:text-[16px] 2xl:text-[18px] 3xl:text-[21px] text-bluegray_600 w-[auto]">
                Quantity
              </Text>
              <Text className="font-medium lg:ml-[47px] xl:ml-[54px] 2xl:ml-[61px] 3xl:ml-[73px] lg:text-[14px] xl:text-[16px] 2xl:text-[18px] 3xl:text-[21px] text-bluegray_600 w-[auto]">
                Base Price
              </Text>
              <Text className="font-medium lg:ml-[42px] xl:ml-[48px] 2xl:ml-[54px] 3xl:ml-[64px] lg:mr-[35px] xl:mr-[40px] 2xl:mr-[46px] 3xl:mr-[55px] lg:text-[14px] xl:text-[16px] 2xl:text-[18px] 3xl:text-[21px] text-bluegray_600 w-[auto]">
                Total Price
              </Text>
            </Row>
            <List className="w-[100%]" orientation="vertical">
              {apiData?.map((apiDataOrdersEle) => {
                return (
                  <Row className="m-[20px] w-[100%]">
                    <CheckBox
                      className="mr-[100px] ml-[100px]"
                      onChange={(e) => {
                        // add to list
                        if (e.target.checked) {
                          setOrderInfo([
                            {
                              orders: apiDataOrdersEle,
                            },
                            ...orderInfo,
                          ]);
                        } else {
                          // remove from list
                          setOrderInfo(
                            orderInfo.filter(
                              (order) => order.orders !== apiDataOrdersEle
                            )
                          );
                        }
                      }}
                      value={orderInfo}
                    ></CheckBox>

                    <Text className="font-normal not-italic lg:text-[12px] xl:text-[14px] text-[16px] 3xl:text-[19px] text-bluegray_900 w-[20rem]">
                      {apiDataOrdersEle?.id}
                    </Text>
                    <Text className="font-normal lg:ml-[39px] xl:ml-[45px] ml-[51px] 3xl:ml-[61px] not-italic lg:text-[12px] xl:text-[14px] text-[16px] 3xl:text-[19px] text-bluegray_900 w-[50px]">
                      {apiDataOrdersEle?.line_items?.[0]?.name}
                    </Text>
                    <Text className="font-normal ml-[120px] not-italic lg:text-[12px] xl:text-[14px] text-[16px] 3xl:text-[19px] text-bluegray_900 w-[50px]">
                      {apiDataOrdersEle?.line_items?.[0]?.quantity}
                    </Text>
                    <Text className="font-normal ml-[120px] not-italic lg:text-[12px] xl:text-[14px] text-[16px] 3xl:text-[19px] text-bluegray_900 w-[50px]">
                      {
                        apiDataOrdersEle?.line_items?.[0]?.base_price_money
                          ?.amount
                      }
                    </Text>
                    <Text className="font-normal ml-[120px] not-italic lg:text-[12px] xl:text-[14px] text-[16px] 3xl:text-[19px] text-bluegray_900 w-[50px]">
                      {
                        apiDataOrdersEle?.line_items?.[0]?.gross_sales_money
                          ?.amount
                      }
                    </Text>
                  </Row>
                );
              })}
            </List>
          </Column>
        </Stack>
      </Column>

      <ToastContainer />
    </>
  );
};

export default OrdersPage;
