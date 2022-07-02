import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./styles/theme";
import { AppRoutes } from "./Routes";
import { SidebarDrawerProvider } from "./contexts/SidebarDrawerContext";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { queryClient } from "./services/queryClient";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <SidebarDrawerProvider>
          <AppRoutes />
        </SidebarDrawerProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
