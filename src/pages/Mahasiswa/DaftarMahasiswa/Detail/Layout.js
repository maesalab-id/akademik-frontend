import { Classes, H3 } from "@blueprintjs/core";
import { AspectRatio, Box, Divider, Flex } from "components";

const Layout = () => {
  return (
    <Flex sx={{ px: 3, mb: '-8px', height: '100%' }}>
      <Box sx={{ py: 4, flexGrow: 1 }}>
        <Box as={H3}>Informasi Umum</Box>
        {[
          ["Nomot KTP", "72239503948503"],
          ["Alamat", "Tikala, Manado"],
          ["Golongan Darah", "O"],
          ["Agama", "Kristen Protestan"],
          ["Status Nikah", "Belum Menikah"],
          ["Program Studi", "Teknik Elektro"]
        ].map((item, idx) => (
          <Flex key={idx} sx={{ mt: 3 }}>
            <Box sx={{ width: "40%", flexShrink: 0, fontWeight: "bold", color: "gray.6" }}>
              <span>{item[0]}</span>
            </Box>
            <Box sx={{ flexGrow: 1 }}>
              <span>{item[1]}</span>
            </Box>
          </Flex>
        ))}
        <Box as={H3} sx={{ mt: 4 }}>Riwayat Pendidikan</Box>
        {[
          ["SD", "SD 69 Negeri Singkawang"],
          ["SMP", "SMP 69 Negeri Singkawang"],
          ["SMA", "SMA 69 Negeri Manado"],
        ].map((item, idx) => (
          <Flex key={idx} sx={{ mt: 3 }}>
            <Box sx={{ width: "30%", flexShrink: 0 }}>
              <span>{item[0]}</span>
            </Box>
            <Box sx={{ width: "30%", flexShrink: 0 }}>
              <span>{item[1]}</span>
            </Box>
            <Box sx={{ flexGrow: 1 }}>
              <span>{item[2]}</span>
            </Box>
          </Flex>
        ))}
      </Box>
      <Divider vertical={true}/>
      <Box sx={{ pt: 4, px: 2, width: 350, flexShrink: 0 }}>
        <Box className={`${Classes.CARD}`} sx={{ p: 2, mb: 2, width: 250 }}>
          <AspectRatio ratio="1:1">
            <Box
              as="img"
              sx={{ width: "100%", height: "100%", display: "block" }}
              src="https://source.unsplash.com/random/180x180"
            />
          </AspectRatio>
        </Box>
        <Box sx={{ fontSize: 3, mb: 2 }}>
          Ridho X Wira
        </Box>
        <Box sx={{ fontWeight: "bold", color: "gray.6" }}>
          2100666
        </Box>
        {[
          ["Tanggal Lahir", "21 Juni 1969"],
          ["Kota Tempat Lahir", "Singkawang"],
          ["Jenis Kelamin", "Laki-laki"],
          ["Telepon", "0852-9948-2331"],
          ["Status", "Aktif"],
        ].map((item, idx) => (
          <Flex key={idx} sx={{ mt: 3 }}>
            <Box sx={{ width: "50%", flexShrink: 0, fontWeight: "bold", color: "gray.6" }}>
              <span>{item[0]}</span>
            </Box>
            <Box sx={{ flexGrow: 1 }}>
              <span>{item[1]}</span>
            </Box>
          </Flex>
        ))}
      </Box>
    </Flex>
  )
}

export default Layout;