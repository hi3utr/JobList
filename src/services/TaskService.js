import Instance from "../AxiosInstance";

export const getTaskList = async (search) => {
  const res = await Instance.get("/todo", {
    params: { search },
  });
  return res;
};

export const deleteTask = async (record) => {
  const res = await Instance.delete("/todo/" + record.id, {});
  return res;
};

export const updateTask = async (data, jobId) => {
  const res = await Instance.put("/todo/" + jobId, {
    data,
  });
  return res;
};

export const addTask = async (data) => {
  const res = await Instance.post("/todo/", {
    data,
  });
  return res;
};

export const getBookmarkList = async (search) => {
  const res = await Instance.get("/todo", {
    params: { search, bookmark: true },
  });
  return res;
};

export const updateBookmarkList = async (record) => {
  const res = await Instance.put("/todo/" + record.id, {
    data: { bookmark: !record.bookmark },
  });

  return res;
};
