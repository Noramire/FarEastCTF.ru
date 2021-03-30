import React from 'react';
import {
  Edit,
  SimpleForm,
  TextInput,
  TranslatableInputs,
  Toolbar,
  List,
  Datagrid,
  TextField,
  NumberInput,
  ArrayInput,
  SimpleFormIterator,
  BooleanInput,
  ImageField,
} from 'react-admin';
import { Typography } from '@material-ui/core';

const SettingsEdit = (props) => (
  <Edit {...props}>
    <SimpleForm fullWidth toolbar={<Toolbar alwaysEnableSaveButton />}>
      <Typography variant="h3">Настройки сайта</Typography>
      <Typography variant="h6">Главные настройки</Typography>
      <TextInput source="site.url" label="Домен сайта" fullWidth />
      <TranslatableInputs locales={['ru-RU', 'en-US']} defaultLocale="ru-RU">
        <TextInput source="site.title" label="Название сайта" fullWidth />
        <TextInput source="site.description" label="Описание сайта" fullWidth />
      </TranslatableInputs>
      <TextInput source="site.icon" label="Иконка сайта" fullWidth />
      <ImageField source="site.icon" label="Первью изображения" />
      <ArrayInput source="navigationLinks" label="Навигационное меню">
        <SimpleFormIterator>
          <TextInput source="title.ru-RU" label="Текст (рус.)" />
          <TextInput source="title.en-US" label="Текст (англ.)" />
          <TextInput source="url" label="Ссылка" />
        </SimpleFormIterator>
      </ArrayInput>
      <ArrayInput source="slides" label="Слайды на главной странице">
        <SimpleFormIterator>
          <TextInput source="id" label="Идентификатор поста (строка)" />
        </SimpleFormIterator>
      </ArrayInput>
      <ArrayInput source="socials" label="Социальные сети">
        <SimpleFormIterator>
          <TextInput source="title.ru-RU" label="Текст (рус.)" />
          <TextInput source="title.en-US" label="Текст (англ.)" />
        </SimpleFormIterator>
      </ArrayInput>

      <Typography variant="h6">Настройки блога</Typography>
      <NumberInput source="posts.postsPerPage" label="Количество постов на страницу (прим. 10)" fullWidth />

      <Typography variant="h6">Настройки &quot;Спонсоры&quot;</Typography>
      <TextInput source="sponsors.landingImage.image" label="Изображение спонсора на главной странице" fullWidth />
      <TextInput source="sponsors.mainImage.image" label="Изображение главного спонсора на странице спонсоров" fullWidth />
      <TextInput source="sponsors.mainImage.url" label="Ссылка на главного спонсора" fullWidth />
      <ArrayInput source="sponsors.list" label="Список спонсоров">
        <SimpleFormIterator>
          <TextInput source="title.ru-RU" label="Текст (рус.)" />
          <TextInput source="title.en-US" label="Текст (англ.)" />
          <TextInput source="image" label="Изображение спонсора" />
          <TextInput source="url" label="Ссылка на сайт спонсора" />
          <BooleanInput source="main" label="Если отмечено, то спонсор попадает под категорию Спонсоры" fullWidth />
          <BooleanInput source="partner" label="Если отмечено, то спонсор попадет под категории Партнеры" fullWidth />
        </SimpleFormIterator>
      </ArrayInput>

      <Typography variant="h6">Настройки &quot;О нас&quot;</Typography>
      <TextInput source="about.landingImage.image" label="Изображение в секции О нас на главной странице" fullWidth />
      <ArrayInput source="about.images" label="Фотографии на странице О нас">
        <SimpleFormIterator>
          <TextInput source="title.ru-RU" label="Текст (рус.)" />
          <TextInput source="title.en-US" label="Текст (англ.)" />
          <TextInput source="image" label="Ссылка на изображение" />
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Edit>
);

const SettingsList = (props) => (
  <List {...props} bulkActionButtons={false}>
    <Datagrid rowClick="edit">
      <TextField label="Заголовок сайта (рус)" source="site.title.ru-RU" />
    </Datagrid>
  </List>
);

export { SettingsEdit, SettingsList };
