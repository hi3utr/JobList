import Instance from "../AxiosInstance";

export const loginFeat = async (values) => {
  const res = await Instance.post("/auth/local", {
    identifier: values.identifier,
    password: values.password,
  });
  return res;
};

export const registerFeat = async (values) => {
  const res = await Instance.post("/auth/local/register", {
    email: values.email,
    username: values.username,
    password: values.password,
  });
  return res;
};

export const changePasswordFeat = async (data) => {
  const res = await Instance.post("/auth/change-password", {
    currentPassword: data.old_password,
    password: data.new_password,
    passwordConfirmation: data.confirm_password,
  });
  return res;
};
