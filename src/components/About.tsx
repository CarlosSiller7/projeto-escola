import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function AccordionUsage() {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component="span">Sobre mim</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Typography
        sx={{
        textAlign: 'justify',
        textIndent: '2em',
        }}
        >
        Sou Carlos Henrique da Silva, profissional de tecnologia com experiência em Desenvolvimento Front-End e Garantia de Qualidade de Software. Atuei em projetos estratégicos nas áreas imobiliária e de saúde, desenvolvendo sistemas web responsivos e acessíveis com tecnologias modernas como JavaScript, TypeScript, Next.js, TailwindCSS e Material UI. Além disso, possuo sólida experiência em testes manuais e automatizados com Cypress, assegurando estabilidade e performance nas entregas. Com conhecimento em metodologias ágeis (Scrum e Kanban) e uso de ferramentas como Jira, ClickUp e Azure DevOps, busco sempre entregar soluções inovadoras que melhorem a experiência do usuário e agreguem valor ao negócio.
      </Typography>        
      </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography component="span">Tecnologias utilizadas no projeto</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Typography
        sx={{
        textAlign: 'justify',
        textIndent: '2em',
        }}
        >
        O projeto usa Next.js + React 19, com Material UI 7 + TailwindCSS 4 + Emotion para UI/estilização, MUI Data Grid Pro para tabelas, js-cookie para cookies, além de TypeScript + ESLint para qualidade de código.
        </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          <Typography component="span">Dificuldades encontradas</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Typography
        sx={{
        textAlign: 'justify',
        
        }}
        >
        Durante o processo de desenvolvimento, enfrentei alguns desafios relacionados à integração do front-end com a API. A principal dificuldade esteve na implementação da tela de login, que exigia autenticação e comunicação direta com o back-end. Inicialmente, não dispunha das credenciais e do acesso adequado à API, o que impossibilitou o envio correto das requisições e, consequentemente, a validação dos fluxos de autenticação.
        <br />
        Com o avanço do desenvolvimento e após obter acesso completo ao back-end, consegui estruturar a integração de forma consistente, garantindo que o front-end fosse capaz de autenticar usuários, armazenar os tokens de forma segura e manter a comunicação com as demais rotas da aplicação. Apesar das dificuldades iniciais, essa etapa foi importante para consolidar meu aprendizado sobre autenticação, tratamento de erros em requisições assíncronas e boas práticas de integração entre front-end e back-end.
        <br />
        O componente Grid do Material-UI, utilizado para o layout de filtros na interface de busca de escolas, ao que parece está em processo de depreciação. Embora o código atualmente em produção funcione conforme o esperado, a utilização de um componente obsoleto gera avisos (warnings) no console do desenvolvedor. Ignorar esses avisos pode comprometer a manutenção futura e a compatibilidade do sistema com versões mais recentes da biblioteca, além de indicar um débito técnico.
        </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          <Typography component="span">Sugestões</Typography>
        </AccordionSummary>
        <AccordionDetails>
          Nenhuma, até o momento.
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
