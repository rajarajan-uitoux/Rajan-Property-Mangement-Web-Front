import { Button, Collapse, message } from "antd";
import { useState } from "react";
import Editor from "../../components/Information/Editor";
import {
  AboutIcon,
  ArrowIcon,
  TrashIcon
} from "../../utils/constants";
import styles from "./Information.module.css";
import { 
  useInformationListQuery,
  useDeleteInformationMutation
} from "../../services/Information";

const Information = () => {  
  const [addTitle, setAddTitle] = useState(false);

  const [infoDetails, setInfoDetails] = useState<any>({});
  const [type, setType] = useState("add");
  const [update, setUpdate] = useState(false);

  //list query
  const { data } = useInformationListQuery();  

  //delete mutation call
  const [deleteInformation] = useDeleteInformationMutation();

  // add or update information
  const addEdit = (info:any) => {
    setAddTitle(true);
    setInfoDetails(info);
  };

  //delete information
  const remove = (e: any, id: string) => {
    e.stopPropagation();
    deleteInformation({ id: id }).then(() => {
      message.success("Information Deleted Successfully");
    });
  };

  //closing Editor
  const closeEditorHandler = () => {
    setAddTitle(false);
  };

  return (
    <div className={styles.information_main_container}>
      <div className={styles.informationheader}>
        <div className={styles.informationtext}>Information</div>
        {addTitle && infoDetails?.title && (
          <div className={styles.infosub}>| {infoDetails?.title}</div>
        )}

        <div style={{ marginLeft: "auto" }}>
          {addTitle ? (
            <div
              className={`${styles.backButton} color-green`}
              onClick={() => {
                setAddTitle(false);
                setType("add");
              }}
            >
              Back
            </div>
          ) : (
            <Button
              type="primary"
              className={`${styles.addtitlebtn} bg-color-green`}
              onClick={() => addEdit({})}
            >
              Add Title
            </Button>
          )}
        </div>
      </div>
      {!addTitle ? (
        data?.map((info:any, i:number) => (
          <div className={styles.cardcontainer} key={i}>
            <div className={styles.card} onClick={() => {
                    addEdit(info);
                    setType("edit");
                  }}>
              <AboutIcon />

              <div className={styles.infotitle}>{info?.title}</div>

              <div
                className={styles.removecontainer}
                style={{
                  marginLeft: "auto",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div className={styles.remove} onClick={(e) => remove(e,info?.id)}>
                  <TrashIcon className={styles.removeIcon} />
                </div>
                <div
                  className={styles.arrow}
                >
                  <ArrowIcon />
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <Editor
          details={infoDetails}
          type={type}
          update={update}
          setUpdate={setUpdate}
          closeEditor={closeEditorHandler}
        />
      )}
    </div>
  );
}

export default Information;
