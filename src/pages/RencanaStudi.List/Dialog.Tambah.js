import { Button, Classes, Dialog, FileInput, FormGroup, HTMLSelect, InputGroup } from "@blueprintjs/core";
import { Divider, Select, useClient } from "components";
import { Formik } from "formik";
import { useCallback, useState } from "react";
import * as Yup from "yup";

const Schema = Yup.object().shape({
  "name": Yup.string().required(),
})

const DialogMataKuliahBaru = ({
  isOpen,
  onClose = () => { },
  onSubmitted = () => { }
}) => {
  const client = useClient();

  return (
    <Dialog
      enforceFocus={false}
      isOpen={isOpen}
      onClose={() => { onClose() }}
      title="Generate Rencana Studi"
    >
      <Formik
        validationSchema={Schema}
        initialValues={{
          "name": ""
        }}
        onSubmit={async (values, { setErrors, setSubmitting }) => {
          try {
            // const res = await client["subjects"].create(values);
            onClose();
            // onSubmitted(res);
          } catch (err) {
            console.error(err);
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }}
      >
        {({ values, errors, isSubmitting, handleSubmit, handleChange, setFieldValue }) =>
          <form onSubmit={handleSubmit}>
            <div className={Classes.DIALOG_BODY}>
              <FormGroup
                label="Nama Mata Kuliah"
                labelFor="f-name"
                helperText={errors["name"]}
                intent={"danger"}
              >
                <InputGroup
                  id="f-name"
                  name="name"
                  value={values["name"]}
                  onChange={handleChange}
                  intent={errors["name"] ? "danger" : "none"}
                />
              </FormGroup>
            </div>
            <div className={Classes.DIALOG_FOOTER}>
              <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                <Button
                  minimal={true}
                  intent="danger"
                  text="Close"
                  onClick={() => {
                    onClose();
                  }}
                />
                <Button loading={isSubmitting} type="submit" intent="primary" text="Simpan" />
              </div>
            </div>
          </form>
        }
      </Formik>
    </Dialog>
  )
}

export default DialogMataKuliahBaru;