import { Button,  Text, TextInput, Textarea,  Title } from "@mantine/core"
import { Formik, Form, Field } from "formik"
import * as Yup from 'yup'
import { showNotification as notify } from "@mantine/notifications"
import { IconCheck } from "@tabler/icons"
import { SubscribeAPI } from "../APIs/SubscribeAPI"


const initialValues = {
  name: '',
  email: '',
  comments: '',
}

const onSubmit = values => {
  console.log(values);
  SubscribeAPI({email: values.email, subject: 'Subscribed to Newsletter', body: 'Great pleasure to have you on board'})
  .then(response=>{
    console.log(response);
    notify({title: 'Thank you', message: 'Great pleasure to have you on board', icon: <IconCheck />})
  })
  .catch((error)=>console.log(error))
}

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Email is not valid').required('Email is Required'),
})

const SubscribeForm = () => {

    return (
      <Formik 
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}>
        <Form autoComplete="off">
          
          <Title order={2} mt="md">Join the newsletter!</Title>
          <Text fz="sm" c="dimmed" mb="md" px="lg">Subscribe to get latest content by email and to become a fellow member</Text>
          
          <Field name="name">
            {
              (props)=>{
                const {field, meta} = props
                return (
                  <TextInput placeholder={field.name} id={field.name} my="sm" {...field} 
                  error={meta.touched && meta.error ? meta.error : null }  
                  />
                )
              }
            }
          </Field>

          <Field name="email">
            {
              (props)=>{
                const {field, meta} = props
                return (
                  <TextInput placeholder={field.name} id={field.name} my="sm" {...field} 
                  error={meta.touched && meta.error ? meta.error : null }  
                  />
                )
              }
            }
          </Field>

          {/* <Field name="address">
            {
              (props)=>{
                const {field, meta} = props
                return (
                  <TextInput placeholder={field.name} id={field.name} my="sm" {...field} 
                  error={meta.touched && meta.error ? meta.error : null }  
                  />
                )
              }
            }
          </Field> */}

          <Field as = {Textarea}
            placeholder="any comments or suggestions..."
            name="comments" />



          <Button m="sm" type="submit">Let me Join</Button>

        </Form>
      </Formik>
    )
  }

  export default SubscribeForm