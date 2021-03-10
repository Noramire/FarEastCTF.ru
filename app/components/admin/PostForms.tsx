import React from 'react';
import {
  Edit,
  Create,
  SimpleForm,
  TextInput,
  DateTimeInput,
  TranslatableInputs,
  Toolbar,
  ImageField,
  List,
  Datagrid,
  TextField,
  DateField,
  UrlField,
} from 'react-admin';
import dynamic from 'next/dynamic';

const RichTextInput: any = dynamic(() => import('ra-input-rich-text'), { ssr: false });

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],
  [{ header: 1 }, { header: 2 }],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ script: 'sub' }, { script: 'super' }],
  [{ indent: '-1' }, { indent: '+1' }],
  [{ direction: 'rtl' }],
  ['link', 'image', 'video', 'formula'],
  [{ size: ['small', false, 'large', 'huge'] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }],
  [{ font: [] }],
  [{ align: [] }],

  ['clean'],
];

const configureQuill = (quill) => quill.getModule('toolbar').addHandler('image', () => {
  const range = quill.getSelection();
  // eslint-disable-next-line no-alert
  const url = prompt('Вставьте ссылку на изображение');
  if (url) {
    quill.insertEmbed(range.index, 'image', url);
  }
});

const PostCreate = (props) => (
  <Create {...props}>
    <SimpleForm toolbar={<Toolbar alwaysEnableSaveButton />}>
      <h1>Создать пост</h1>
      <TextInput source="slug" label="Идентификатор (для ссылок)" />
      <TranslatableInputs locales={['ru-RU', 'en-US']} defaultLocale="ru-RU">
        <TextInput source="title" label="Заголовок" />
        <TextInput source="description" label="Маленькое описание поста" />
        <RichTextInput source="content" label="Контент" toolbar={toolbarOptions} configureQuill={configureQuill} />
      </TranslatableInputs>
      <TextInput source="thumbnail" label="Изображение (ссылка)" />
      <ImageField source="thumbnail" title="title" label="Первью изображения" />
    </SimpleForm>
  </Create>
);

const PostEdit = (props) => (
  <Edit {...props}>
    <SimpleForm toolbar={<Toolbar alwaysEnableSaveButton />}>
      <h1>Отредактировать пост</h1>
      <TextInput source="slug" label="Идентификатор (для ссылок)" />
      <TranslatableInputs locales={['ru-RU', 'en-US']} defaultLocale="ru-RU">
        <TextInput source="title" label="Заголовок" />
        <TextInput source="description" label="Маленькое описание поста" />
        <RichTextInput source="content" label="Контент" toolbar={toolbarOptions} configureQuill={configureQuill} />
      </TranslatableInputs>
      <TextInput source="thumbnail" label="Изображение (ссылка)" />
      <ImageField source="thumbnail" title="title" label="Первью изображения" />
      <DateTimeInput source="date" label="Дата создания (лучше не редактировать)" />
    </SimpleForm>
  </Edit>
);

const PostList = (props) => (
  <List {...props} sort={{ field: 'date', order: 'DESC' }}>
    <Datagrid rowClick="edit">
      <TextField label="Идентификатор" source="id" />
      <TextField label="Ссылка (slug)" source="slug" />
      <TextField label="Заголовок (рус)" source="title.ru-RU" />
      <TextField label="Описание (рус)" source="description.ru-RU" />
      <UrlField label="Изображение" source="thumbnail" />
      <DateField label="Дата создания" source="date" />
    </Datagrid>
  </List>
);

export { PostEdit, PostList, PostCreate };
