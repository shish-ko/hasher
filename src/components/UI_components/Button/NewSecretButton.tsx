interface INewSecretBtnProps {
  clickHandler: ()=> void;
}

export const NewSecretButton: React.FC<INewSecretBtnProps> = ({clickHandler}) => {
  return (
    <div className="newSecretBtn" onClick={clickHandler}>
      <div className="newSecretBtn__line newSecretBtn__line_horizontal"></div>
      <div className="newSecretBtn__line newSecretBtn__line_vertical"></div>
    </div>
  );
};
