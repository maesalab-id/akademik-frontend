import { Button, Classes, ControlGroup, Dialog, FormGroup, HTMLSelect, InputGroup, Radio, RadioGroup } from "@blueprintjs/core";
import { DateInput } from "@blueprintjs/datetime";
import { Box, Flex, useClient } from "components";
import { Formik } from "formik";
import moment from "moment";
import * as Yup from "yup";

const Schema = Yup.object().shape({
  "nip": Yup.string().required(),
  "nidn": Yup.string().required(),
  "name": Yup.string().required(),
  "front_degree": Yup.string(),
  "back_degree": Yup.string(),
  "id_number": Yup.string().required(),
  "birth_date": Yup.date().required(),
  "birth_city": Yup.string().required(),
  "birth_country": Yup.string().required(),
  "gender": Yup.string().required(),
  "religion": Yup.string().required(),
  "blood_type": Yup.string().required(),
  "married_status": Yup.boolean().required(),
  "home_address": Yup.string().required(),
  "city": Yup.string().required(),
  "country": Yup.string().required(),
  "postal_code": Yup.string().required(),
  "phone_number": Yup.string().required(),
  "type": Yup.string().required(),
  "status": Yup.boolean().required(),
})

const DialogTambahBaru = ({
  isOpen,
  onClose = () => { },
  onSubmitted = () => { }
}) => {
  const client = useClient();
  return (
    <Dialog
      isOpen={isOpen}
      onClose={() => { onClose() }}
      title="Tambah Baru"
    >
      <Formik
        validationSchema={Schema}
        initialValues={{
          "nip": "",
          "nidn": "",
          "name": "",
          "front_degree": "",
          "back_degree": "",
          "id_number": "",
          "birth_date": new Date(),
          "birth_city": "",
          "birth_country": "",
          "gender": "",
          "religion": "",
          "blood_type": "O",
          "married_status": "false",
          "home_address": "",
          "city": "",
          "country": "",
          "postal_code": "",
          "phone_number": "",
          "type": "Dosen",
          "status": "true",
        }}
        onSubmit={async (values, { setErrors, setSubmitting }) => {
          console.log(values);
          try {
            const res = await client["lecturers"].create(values);
            console.log(res);
            onClose();
            onSubmitted(res);
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
                label="NIP"
                labelInfo="(Nomor Identitas Pegawai Negeri Sipil)"
                labelFor="f-nip"
                helperText={errors["nip"]}
                intent={"danger"}
              >
                <InputGroup
                  id="f-nip"
                  name="nip"
                  value={values["nip"]}
                  onChange={handleChange}
                  intent={errors["nip"] ? "danger" : "none"}
                />
              </FormGroup>
              <FormGroup
                label="NIDN"
                labelInfo="(Nomor Induk Dosen Nasional)"
                labelFor="f-nidn"
                helperText={errors["nidn"]}
                intent={"danger"}
              >
                <InputGroup
                  id="f-nidn"
                  name="nidn"
                  value={values["nidn"]}
                  onChange={handleChange}
                  intent={errors["nidn"] ? "danger" : "none"}
                />
              </FormGroup>
              <FormGroup
                label="NIK"
                labelInfo="(Nomor Induk Kependudukan)"
                labelFor="f-id_number"
                helperText={errors["id_number"]}
                intent={"danger"}
              >
                <InputGroup
                  id="f-id_number"
                  name="id_number"
                  value={values["id_number"]}
                  onChange={handleChange}
                  intent={errors["id_number"] ? "danger" : "none"}
                />
              </FormGroup>
              <FormGroup
                label="Name Lengkap"
                labelFor="f-name"
                helperText={errors["name"] || errors["front_degree"] || errors["back_degree"]}
                intent={"danger"}
              >
                <ControlGroup>
                  <InputGroup
                    fill={true}
                    id="f-front_degree"
                    name="front_degree"
                    value={values["front_degree"]}
                    placeholder="Gelar Depan"
                    onChange={handleChange}
                    intent={errors["front_degree"] ? "danger" : "none"}
                  />
                  <InputGroup
                    id="f-name"
                    name="name"
                    value={values["name"]}
                    placeholder="Nama"
                    onChange={handleChange}
                    intent={errors["name"] ? "danger" : "none"}
                  />
                  <InputGroup
                    fill={true}
                    id="f-back_degree"
                    name="back_degree"
                    placeholder="Gelar Belakang"
                    value={values["back_degree"]}
                    onChange={handleChange}
                    intent={errors["back_degree"] ? "danger" : "none"}
                  />
                </ControlGroup>
              </FormGroup>
              <Flex sx={{
                mx: -2,
                "> div": {
                  width: "50%",
                  px: 2,
                  flexGrow: 1,
                }
              }}>
                <Box>
                  <FormGroup
                    label="Kota Kelahiran"
                    labelFor="f-birth_city"
                    helperText={errors["birth_city"]}
                    intent={"danger"}
                  >
                    <InputGroup
                      fill={true}
                      id="f-birth_city"
                      name="birth_city"
                      value={values["birth_city"]}
                      onChange={handleChange}
                      intent={errors["birth_city"] ? "danger" : "none"}
                    />
                  </FormGroup>
                </Box>
                <Box>
                  <FormGroup
                    label="Negara Kelahiran"
                    labelFor="f-birth_country"
                    helperText={errors["birth_country"]}
                    intent={"danger"}
                  >
                    <InputGroup
                      fill={true}
                      id="f-birth_country"
                      name="birth_country"
                      value={values["birth_country"]}
                      onChange={handleChange}
                      intent={errors["birth_country"] ? "danger" : "none"}
                    />
                  </FormGroup>
                </Box>
              </Flex>
              <FormGroup
                label="Tanggal Kelahiran"
                labelFor="f-birth_date"
                helperText={errors["birth_date"]}
                intent={"danger"}
              >
                <DateInput
                  fill={true}
                  id="f-birth_date"
                  name="birth_date"
                  value={values["birth_date"]}
                  intent={errors["birth_date"] ? "danger" : "none"}
                  formatDate={date => moment(date).format("DD MMMM YYYY")}
                  parseDate={(str) => new Date(str)}
                  onChange={(v) => {
                    setFieldValue("publish_date", v);
                  }}
                />
              </FormGroup>
              <FormGroup
                label="Alamat Tempat Tinggal"
                labelFor="f-home_address"
                helperText={errors["home_address"]}
                intent={"danger"}
              >
                <InputGroup
                  fill={true}
                  id="f-home_address"
                  name="home_address"
                  value={values["home_address"]}
                  onChange={handleChange}
                  intent={errors["home_address"] ? "danger" : "none"}
                />
              </FormGroup><Flex sx={{
                mx: -2,
                "> div": {
                  width: "50%",
                  px: 2,
                  flexGrow: 1,
                }
              }}>
                <Box>
                  <FormGroup
                    label="Kota Tempat Tinggal"
                    labelFor="f-city"
                    helperText={errors["city"]}
                    intent={"danger"}
                  >
                    <InputGroup
                      fill={true}
                      id="f-city"
                      name="city"
                      value={values["city"]}
                      onChange={handleChange}
                      intent={errors["city"] ? "danger" : "none"}
                    />
                  </FormGroup>
                </Box>
                <Box>
                  <FormGroup
                    label="Kode Pos"
                    labelFor="f-postal_code"
                    helperText={errors["postal_code"]}
                    intent={"danger"}
                  >
                    <InputGroup
                      fill={true}
                      id="f-postal_code"
                      name="postal_code"
                      value={values["postal_code"]}
                      onChange={handleChange}
                      intent={errors["postal_code"] ? "danger" : "none"}
                    />
                  </FormGroup>
                </Box>
              </Flex>
              <FormGroup
                label="Negara Tempat Tinggal"
                labelFor="f-country"
                helperText={errors["country"]}
                intent={"danger"}
              >
                <InputGroup
                  fill={true}
                  id="f-country"
                  name="country"
                  value={values["country"]}
                  onChange={handleChange}
                  intent={errors["country"] ? "danger" : "none"}
                />
              </FormGroup>
              <FormGroup
                label="Jenis Kelamin"
                labelFor="f-gender"
                helperText={errors["gender"]}
                intent={"danger"}
              >
                <HTMLSelect
                  id="f-gender"
                  name="gender"
                  value={values["gender"]}
                  onChange={handleChange}
                  intent={errors["gender"] ? "danger" : "none"}
                  options={[
                    { label: "Pilih", value: "", disabled: true },
                    "Pria",
                    "Wanita",
                    "Tidak ingin disebutkan"
                  ]}
                />
              </FormGroup>
              <FormGroup
                label="Agama"
                labelFor="f-religion"
                helperText={errors["religion"]}
                intent={"danger"}
              >
                <HTMLSelect
                  id="f-religion"
                  name="religion"
                  value={values["religion"]}
                  onChange={handleChange}
                  intent={errors["religion"] ? "danger" : "none"}
                  options={[
                    { label: "Pilih", value: "", disabled: true },
                    "Kristen Protestan",
                    "Kristen Katholik",
                    "Islam",
                    "Hindu",
                    "Buddha",
                    "Konghucu",
                    "Lainnya",
                  ]}
                />
              </FormGroup>
              <FormGroup
                label="Golongan Darah"
                labelFor="f-blood_type"
                helperText={errors["blood_type"]}
                intent={"danger"}
              >
                <HTMLSelect
                  id="f-blood_type"
                  name="blood_type"
                  value={values["blood_type"]}
                  onChange={handleChange}
                  intent={errors["blood_type"] ? "danger" : "none"}
                  options={[
                    "O",
                    "A",
                    "B",
                    "AB"
                  ]}
                />
              </FormGroup>
              <FormGroup
                label="Status Pernikahan"
                labelFor="f-married_status"
                helperText={errors["married_status"]}
                intent={"danger"}
              >
                <RadioGroup
                  id="f-married_status"
                  name="married_status"
                  selectedValue={values["married_status"]}
                  onChange={handleChange}
                  intent={errors["married_status"] ? "danger" : "none"}
                >
                  <Radio label="Menikah" value={"true"} />
                  <Radio label="Belum Menikah" value={"false"} />
                </RadioGroup>
              </FormGroup>
              <FormGroup
                label="Nomor Hanphone"
                labelFor="f-phone_number"
                helperText={errors["phone_number"]}
                intent={"danger"}
              >
                <InputGroup
                  fill={true}
                  id="f-phone_number"
                  name="phone_number"
                  value={values["phone_number"]}
                  onChange={handleChange}
                  intent={errors["phone_number"] ? "danger" : "none"}
                />
              </FormGroup>
              <FormGroup
                label="Jenis Kepegawaian"
                labelFor="f-type"
                helperText={errors["type"]}
                intent={"danger"}
              >
                <HTMLSelect
                  id="f-type"
                  name="type"
                  value={values["type"]}
                  onChange={handleChange}
                  intent={errors["type"] ? "danger" : "none"}
                  options={[
                    "Pengajar",
                    "Staff"
                  ]}
                />
              </FormGroup>
              <FormGroup
                label="Status"
                labelFor="f-status"
                helperText={errors["status"]}
                intent={"danger"}
              >
                <RadioGroup
                  id="f-status"
                  name="status"
                  selectedValue={values["status"]}
                  onChange={handleChange}
                  intent={errors["status"] ? "danger" : "none"}
                >
                  <Radio label="Aktif" value={"true"} />
                  <Radio label="Tidak Aktif" value={"false"} />
                </RadioGroup>
              </FormGroup>
            </div>
            <div className={Classes.DIALOG_FOOTER}>
              <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                <Button minimal={true} intent="danger" text="Close" />
                <Button loading={isSubmitting} type="submit" intent="primary" text="Simpan" />
              </div>
            </div>
          </form>
        }
      </Formik>
    </Dialog>
  )
}

export default DialogTambahBaru;