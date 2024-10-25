import { InputLeftAddon } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
export const InputLeftAddonStyles = {
  components: {
		InputLeftAddon: {
			baseStyle: {
				field: {
					fontWeight: 400,
					borderRadius: "8px",
				},
			},

			variants: {
				auth: (props) => ({
					field: {
            fontWeight: "500",
            color: mode("navy.700", "white")(props),
            bg: mode("transparent", "transparent")(props),
            border: "1px solid",
            borderColor: mode(
              "secondaryGray.100",
              "rgba(135, 140, 189, 0.3)"
            )(props),
            borderRadius: "16px",
            _placeholder: { color: "secondaryGray.600", fontWeight: "400" },
          },
				}),
			},
		},
	},
};
