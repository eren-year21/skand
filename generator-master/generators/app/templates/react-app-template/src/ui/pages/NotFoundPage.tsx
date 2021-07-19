import * as React from 'react';
import { ErrorTemplate } from '../templates/ErrorTemplate';

interface INotFoundPageProps {
  toIndexPage: () => void;
}

type TNotFoundPageProps = INotFoundPageProps;

export const NotFoundPage: React.FC<TNotFoundPageProps> = (props) => {
  const { toIndexPage } = props;
  return (
    <ErrorTemplate
      action={toIndexPage}
      actionText="Перейти на главную"
      title="404"
      description="Запрашиваемый ресурс не найден"
    />
  );
};
