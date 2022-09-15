import { apis } from "service";

const COMMON_URL = `https://`;

const API_URLS = {
  POST_BATCHRETRIEVE: `${COMMON_URL}connect.squareupsandbox.com/v2/orders/batch-retrieve?`,
  POST_LOGIN: `${COMMON_URL}nodedemo.dhiwise.co/device/auth/login?`,
};

export const postBatchretrieve = (payload) =>
  apis.post(API_URLS.POST_BATCHRETRIEVE, {
    ...payload,
    headers: {
      "Square-Version": "2022-07-20",
      Authorization:
        "Bearer EAAAEHCJQbrZZNwDtoKL5f6nPdygZaWcVqDaIiw9vbePV84ouJrWs_IRCeTAB7g_",
      ...payload?.headers,
    },
    data: {
      location_id: "L09XSMHWWY625",
      order_ids: [
        "rRJf35nfnRTddFHDopDo9Aj6JxUZY",
        "FmN31aRiQmXeHX7H721j38ai8r6YY",
        "VG97Mfa6S5ZnRhBuKJ4AyKbMIBgZY",
        "3zRiuvpiMoV41LkVYZ2eVisbfHYZY",
      ],
      ...payload?.data,
    },
  });

export const postLogin = (payload) => apis.post(API_URLS.POST_LOGIN, payload);
