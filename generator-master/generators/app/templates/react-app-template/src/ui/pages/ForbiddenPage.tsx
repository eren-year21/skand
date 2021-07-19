import * as React from 'react';
import { ErrorTemplate } from '../templates/ErrorTemplate';

interface IForbiddenPageProps {
  toIndexPage: () => void;
}

type TForbiddenPageProps = IForbiddenPageProps;

export const ForbiddenPage: React.FC<TForbiddenPageProps> = (props) => {
  const { toIndexPage } = props;
  return (
    <ErrorTemplate
      action={toIndexPage}
      actionText="Перейти на главную"
      title="403"
      description="Недостаточно прав для доступа к ресурсу"
    />
  );
};
