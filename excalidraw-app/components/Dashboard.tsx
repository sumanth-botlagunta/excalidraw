import React, { useState, useEffect } from "react";

const Dashboard = () => {
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    const loadFiles = async () => {
      const folderHandle = await window.showDirectoryPicker();
      const files: File[] = [];
      for await (const entry of folderHandle.values()) {
        if (entry.kind === "file") {
          files.push(await entry.getFile());
        }
      }
      setFiles(files);
    };

    loadFiles();
  }, []);

  const openFile = async (file: File) => {
    const fileHandle = await window.showOpenFilePicker({
      types: [
        {
          description: "Excalidraw Files",
          accept: { "application/json": [".excalidraw"] },
        },
      ],
    });
    const fileData = await fileHandle[0].getFile();
    const fileContent = await fileData.text();
    // Logic to open and view the file content
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <ul>
        {files.map((file) => (
          <li key={file.name}>
            {file.name}
            <button onClick={() => openFile(file)}>Open</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
