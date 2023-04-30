import notFoundStyles from "./not-found.module.css";

export const NotFound = () => {
  return (
    <div className={`${notFoundStyles.notFound}`}>
      <p className="text text_type_main-large">
        Страница не найдена. Ошибка 404.
      </p>
    </div>
  );
};
