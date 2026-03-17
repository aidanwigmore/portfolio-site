import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';

import Box from '@mui/material/Box';

import LanguageIcon from '@mui/icons-material/Language';
import { IconButton, Link, Tooltip } from '@mui/material';

export default function Contact() {
    const items= [
        {
        title: "Fxns - Contributor - ",
        description: [
          "Identified and resolved workflow bugs while improving frontend readability and maintainability.",
          "Participated in bi-weekly scrum meetings with progress reporting and task tracking."
        ],
        src: "https://www.fxns.ca/",
        },
        {
        title: "IdeaBurn - Personal Project - ",
        description: [
          "Designed and deployed a full stack idea-sharing platform using Django, React, and SQLite.",
          "Implemented JWT authentication, role-based access control, pagination, and search functionality.",
          "Designed REST APIs and integrated frontend state management with secure token handling.",
          "Structured project architecture, database models, and environment configuration."
        ],
        src: "https://ideaburn.xyz",
        },
        {
        title: "TeaBank - Capstone Project - ",
        description: [
          "Tea Purchasing Platform",
          "Developed a full stack web application using Django and PostgreSQL/SQLite.",
          "Integrated PayPal API for secure payment processing.",
          "Implemented Google Maps API for address validation.",
          "Designed relational database schemas and REST endpoints."
        ],
        src: "https://teabankclient-d9c62f61e84a.herokuapp.com/",
        },
    ];

    return (
        <>
        <List dense={false}>
            {items.map((item, index) => (
        <ListItem
          key={index}
          sx={{
            backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#eaeaea", // Alternate background colors
            borderRadius: "8px",
            marginBottom: "16px",
          }}
        >
          <ListItemAvatar>
            <Tooltip title={item.src} arrow>
              <IconButton 
                component="a" // Make the IconButton behave like a link
                href={item.src} // Navigate to the URL specified in the `src` property
                target="_blank" // Open the link in a new tab
                rel="noopener noreferrer"
              >
                <LanguageIcon />
              </IconButton>
            </Tooltip>
          </ListItemAvatar>
          <ListItemText key={`${item.title}-${index}`} 
            primary={
              <>
                {item.title}
                {
                  <Tooltip title={item.src} arrow>
                    <a href={item.src} target="_blank" rel="noopener noreferrer">
                      {item.src}
                    </a>
                  </Tooltip>
                }
              </>} 
            secondary={
              item.description.map((desc, descIndex) => (
                <span 
                  key={`${item.title}-desc-${descIndex}`}
                  style={{
                    display: 'block',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    fontSize: 'clamp(0.75rem, 2vw, 1rem)'
                  }}
                >
                  -{desc}
                  <br />
                </span>
              ))
            } />
        </ListItem>
        ))}
        </List>
        </>
    )
}