import { useState } from "react";
import "./App.css";
import { uploadFile } from "./services/upload";
import { toast, Toaster } from "sonner";
import { type Data } from "./types";
import { Search } from "./steps/Search";

const APP_STATUS = {
  IDLE: "idle", // Al entrar
  ERROR: "error", // cuando hay un Error
  READY_UPLOAD: "ready_upload", //al elegir el archivo
  UPLOADING: "uploading", //mientras se sube el archivo
  READY_USAGE: "ready_usage", //después de subir el archivo
} as const;

type AppStatusType = (typeof APP_STATUS)[keyof typeof APP_STATUS];

function App() {
  const [appStatus, setAppStatus] = useState<AppStatusType>(APP_STATUS.IDLE);
  const [file, setFile] = useState<File | null>(null);

  const [data, setData] = useState<Data>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const [file] = event.target.files ?? [];
    if (file) {
      setFile(file);
      setAppStatus(APP_STATUS.READY_UPLOAD);
    }
    console.log(file);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (appStatus !== APP_STATUS.READY_UPLOAD || !file) {
      return;
    }
    setAppStatus(APP_STATUS.UPLOADING);

    const [err, newData] = await uploadFile(file);
    console.log({ newData });
    if (err) {
      setAppStatus(APP_STATUS.ERROR);
      toast.error(err.message);
      return;
    }

    setAppStatus(APP_STATUS.READY_USAGE);
    if (newData) setData(newData);
    toast.success("Archivo subido correctamente");
  };

  const BUTTON_TEXT = {
    [APP_STATUS.READY_UPLOAD]: "Subir archivo",
    [APP_STATUS.UPLOADING]: "Subiendo...",
  };

  const showButton =
    appStatus === APP_STATUS.READY_UPLOAD || appStatus === APP_STATUS.UPLOADING;

  const showInput = appStatus !== APP_STATUS.READY_USAGE;
  return (
    <>
      <Toaster />
      <h4>Challange: Upload CSV + Search</h4>
      {showInput && (
        <form onSubmit={handleSubmit}>
          <label>
            <input
              disabled={appStatus === APP_STATUS.UPLOADING}
              type="file"
              onChange={handleInputChange}
              name="file"
              accept=".csv"
            />
          </label>
          {showButton && (
            <button disabled={appStatus === APP_STATUS.UPLOADING}>
              {BUTTON_TEXT[appStatus]}
            </button>
          )}
        </form>
      )}

      {appStatus === APP_STATUS.READY_USAGE && (
        <>
          <div> {data.length} registros cargados</div>

          <Search initialData={data} />
        </>
      )}
    </>
  );
}

export default App;
