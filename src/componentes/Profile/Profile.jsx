import "./Profile.scss";
import { image } from "../../assets";
import { User } from "../../api";
import { useEffect, useState } from "react";
import { ENV } from "../../utils";
import { useAuth } from "../../hooks";
import { Dropdown, Icon, Loader } from "semantic-ui-react";
import { BasicModal, FormUser } from "../Shared";
import { size } from "lodash";
import { ConfigureAuth } from "../ConfigureAuth";
const userController = new User();

export const Profile = () => {
  const [userMe, setUserMe] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [onReload, setOnReload] = useState(false);
  const [configureModal, setConfigureModal] = useState(false);
  const { accessToken } = useAuth();

  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
  const onOpenConfigureModal = () =>
    setConfigureModal((prevState) => !prevState);

  useEffect(() => {
    getInfoUser();
  }, [onReload]);

  const getInfoUser = async () => {
    try {
      const response = await userController.getMe(accessToken);
      setUserMe(response.response);
    } catch (error) {
      console.log(error);
    }
  };
  const handleReload = () => setOnReload((prevState) => !prevState);

  if (size(userMe) === 0) return <Loader active inline="centered" />;

  return (
    <>
      <div className="profile">
        {Object.keys(userMe).length > 0 && (
          <div
            className="profile__user"
            key={userMe._id}
            onClick={onOpenCloseModal}
          >
            <img
              src={
                userMe.avatar
                  ? `${ENV.BASE_PATH}/${userMe.avatar}`
                  : image.avatarDefault
              }
              alt="avatar "
            />
            <div className="profile__user-info">
              <h2>{userMe.firstname}</h2>
              <span>{userMe.email}</span>
            </div>
          </div>
        )}
        <Dropdown
          icon="ellipsis vertical"
          className="post-item__dropdown"
          direction="left"
        >
          <Dropdown.Menu>
            <Dropdown.Item onClick={onOpenConfigureModal}>
              <Icon name="cog" />
              Configuracion
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <BasicModal show={showModal} close={onOpenCloseModal} title="Editar">
        <div className="configure-profile">
          <FormUser
            userMe={userMe}
            close={onOpenCloseModal}
            onReload={handleReload}
          />
        </div>
      </BasicModal>
      <BasicModal
        show={configureModal}
        close={onOpenConfigureModal}
        title="Configuraciones"
        size="mini"
      >
        <ConfigureAuth onOpenConfigureModal={onOpenConfigureModal} />
      </BasicModal>
    </>
  );
};
