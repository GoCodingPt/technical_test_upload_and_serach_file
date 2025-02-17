import express from "express";
import cors from "cors";
import multer from "multer";
import csvToJson from "convert-csv-to-json";

const app = express();
const port = process.env.PORT ?? 3000;

const storage = multer.memoryStorage();
const upload = multer({ storage }).single("file");
let userData: Array<Record<string, string>> = [];

app.use(cors()); // Enable CORS for all requests

app.post("/api/files", upload, async (req, res): Promise<any> => {
  // 1. Extract the file from the request
  const { file } = req;

  // 2. Validate that we have a file
  if (!file) {
    return res.status(500).json({ message: "File is required" });
  }
  // 3. Validate the mime type
  if (file.mimetype !== "text/csv") {
    return res.status(500).json({ message: "File must be a CSV" });
  }
  let json: Array<Record<string, string>> = [];
  try {
    // 4. Transform file to base64 to Strig
    const rawCsv = Buffer.from(file.buffer).toString("utf-8");
    console.log(rawCsv);
    // 5. Transform string (csv) to json
    json = csvToJson.fieldDelimiter(",").csvStringToJson(rawCsv);
  } catch (error) {
    return res.status(500).json({ message: "Error parsing the file" });
  }
  // 6. Save the json to db (or memory)
  userData = json;
  // 7. Return 200 with the message and the json
  return res
    .status(200)
    .json({ data: userData, message: "File uploaded successfully" });
});

app.get("/api/users", async (req, res): Promise<any> => {
  // 1. Extract the query params ``q` from the request
  const { q } = req.query;

  // 2. Validate that we have a query params
  if (!q) {
    return res.status(500).json({ message: "Query param `q` is required" });
  }
  if (Array.isArray(q)) {
    return res
      .status(500)
      .json({ message: "Query param `q` must be a string" });
  }
  // 3. Filter the data from db (or memory) with the query params
  const search = q.toString().toLowerCase();
  const filteredData = userData.filter((row) => {
    return Object.values(row).some((value) =>
      value.toLowerCase().includes(search)
    );
  });

  // 4. Return 200 with the filtered data
  return res.status(200).json({ data: filteredData });
});

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
