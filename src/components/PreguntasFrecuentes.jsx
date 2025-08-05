import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Button,
  IconButton,
  Divider,
  Paper,
  Chip,
  Avatar,
  InputAdornment,
  Tabs,
  Tab,
  Badge
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Add as AddIcon,
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Check as CheckIcon,
  Close as CloseIcon,
  QuestionAnswer as QuestionAnswerIcon,
  Person as PersonIcon,
  AdminPanelSettings as AdminIcon
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const FAQComponent = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState(0);
  const [faqs, setFaqs] = useState([
    {
      id: 1,
      question: "¿Cómo puedo realizar un pedido?",
      answer: "Puedes realizar tu pedido a través de nuestra página web seleccionando los productos y completando el proceso de compra.",
      category: "general",
      date: new Date('2023-05-15'),
      answered: true,
      askedBy: null,
      answeredBy: "admin@example.com"
    }
  ]);

  const [userQuestions, setUserQuestions] = useState([
    {
      id: 101,
      question: "¿Tienen envío internacional?",
      answer: "",
      category: "envios",
      date: new Date(),
      answered: false,
      askedBy: "usuario@example.com",
      answeredBy: null
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ question: '', answer: '' });

  // Categorías disponibles
  const categories = [
    { id: 'general', label: 'General' },
    { id: 'pagos', label: 'Pagos' },
    { id: 'envios', label: 'Envíos' },
    { id: 'productos', label: 'Productos' }
  ];

  // Filtrar preguntas según la categoría y búsqueda
  const filteredFaqs = faqs.filter(faq => 
    (faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
     faq.answer.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (activeTab === 0 || faq.category === categories[activeTab - 1].id)
  );

  // Preguntas de usuarios no respondidas
  const unansweredQuestions = userQuestions.filter(q => !q.answered);

  // Función para expandir/contraer preguntas
  const handleExpand = (id) => {
    setFaqs(faqs.map(faq => ({
      ...faq,
      expanded: faq.id === id ? !faq.expanded : false
    })));
  };

  // Función para enviar nueva pregunta de usuario
  const handleSubmitQuestion = () => {
    if (newQuestion.trim() && user) {
      const newQuestionObj = {
        id: Math.max(...userQuestions.map(q => q.id), 0) + 1,
        question: newQuestion,
        answer: "",
        category: categories[activeTab - 1]?.id || 'general',
        date: new Date(),
        answered: false,
        askedBy: user.email,
        answeredBy: null
      };
      
      setUserQuestions([...userQuestions, newQuestionObj]);
      setNewQuestion('');
      // Aquí deberías hacer una llamada a tu API para guardar la pregunta
    }
  };

  // Función para responder una pregunta de usuario
  const handleAnswerQuestion = (questionId, answer) => {
    if (answer.trim() && (user?.rol === 'administrador' || user?.rol === 'superadministrador')) {
      // Mover de userQuestions a faqs
      const questionToAnswer = userQuestions.find(q => q.id === questionId);
      const answeredQuestion = {
        ...questionToAnswer,
        answer,
        answered: true,
        answeredBy: user.email,
        date: new Date()
      };
      
      setUserQuestions(userQuestions.filter(q => q.id !== questionId));
      setFaqs([...faqs, answeredQuestion]);
      setNewAnswer('');
      // Aquí deberías hacer una llamada a tu API para actualizar
    }
  };

  // Función para editar una pregunta
  const handleEdit = (faq) => {
    setEditingId(faq.id);
    setEditData({ question: faq.question, answer: faq.answer });
  };

  // Función para guardar la edición
  const handleSaveEdit = () => {
    setFaqs(faqs.map(faq => 
      faq.id === editingId ? { ...faq, ...editData } : faq
    ));
    setEditingId(null);
  };

  // Función para eliminar una pregunta
  const handleDelete = (id, isUserQuestion = false) => {
    if (isUserQuestion) {
      setUserQuestions(userQuestions.filter(q => q.id !== id));
    } else {
      setFaqs(faqs.filter(faq => faq.id !== id));
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', my: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
        Preguntas Frecuentes
      </Typography>

      {/* Pestañas de categorías */}
      <Tabs 
        value={activeTab} 
        onChange={(e, newValue) => setActiveTab(newValue)}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ mb: 3 }}
      >
        <Tab label="Todas" />
        {categories.map(category => (
          <Tab key={category.id} label={category.label} />
        ))}
        {(user?.rol === 'administrador' || user?.rol === 'superadministrador') && (
          <Tab 
            label={
              <Badge badgeContent={unansweredQuestions.length} color="error">
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <QuestionAnswerIcon sx={{ mr: 1 }} />
                  Por responder
                </Box>
              </Badge>
            } 
          />
        )}
      </Tabs>

      {/* Barra de búsqueda */}
      <TextField
        fullWidth
        placeholder="Buscar en preguntas frecuentes..."
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 3 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      {/* Contenido según pestaña seleccionada */}
      {activeTab <= categories.length ? (
        <>
          {/* Lista de preguntas frecuentes */}
          <Paper elevation={2} sx={{ mb: 4 }}>
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq) => (
                <div key={faq.id}>
                  <Accordion elevation={0}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      sx={{
                        backgroundColor: 'background.paper',
                        minHeight: 64
                      }}
                    >
                      <Box sx={{ flex: 1 }}>
                        <Typography sx={{ fontWeight: 'medium' }}>
                          {faq.question}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                          <Chip 
                            label={categories.find(c => c.id === faq.category)?.label || 'General'} 
                            size="small" 
                            sx={{ mr: 1 }} 
                          />
                          <Typography variant="caption" color="text.secondary">
                            {format(faq.date, "PPP", { locale: es })}
                          </Typography>
                        </Box>
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails sx={{ pt: 2, pb: 3 }}>
                      <Box sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Avatar sx={{ width: 24, height: 24, mr: 1 }}>
                            <AdminIcon fontSize="small" />
                          </Avatar>
                          <Typography variant="body2" color="text.secondary">
                            Respuesta oficial
                          </Typography>
                        </Box>
                        <Typography paragraph sx={{ ml: 4 }}>
                          {faq.answer}
                        </Typography>
                      </Box>
                      
                      {faq.askedBy && (
                        <Box sx={{ 
                          backgroundColor: 'action.hover', 
                          p: 2, 
                          borderRadius: 1,
                          mb: 2
                        }}>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            Pregunta original de:
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar sx={{ width: 24, height: 24, mr: 1 }}>
                              <PersonIcon fontSize="small" />
                            </Avatar>
                            <Typography variant="body2">
                              {faq.askedBy}
                            </Typography>
                          </Box>
                        </Box>
                      )}

                      {(user?.rol === 'administrador' || user?.rol === 'superadministrador') && (
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                          <Button
                            variant="outlined"
                            startIcon={<EditIcon />}
                            onClick={() => handleEdit(faq)}
                          >
                            Editar
                          </Button>
                          <Button
                            variant="outlined"
                            startIcon={<DeleteIcon />}
                            onClick={() => handleDelete(faq.id)}
                            color="error"
                          >
                            Eliminar
                          </Button>
                        </Box>
                      )}
                    </AccordionDetails>
                  </Accordion>
                  <Divider />
                </div>
              ))
            ) : (
              <Box sx={{ p: 3, textAlign: 'center' }}>
                <Typography color="text.secondary">
                  No se encontraron preguntas en esta categoría
                </Typography>
              </Box>
            )}
          </Paper>

          {/* Formulario para que usuarios hagan preguntas */}
          {user && activeTab > 0 && (
            <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                ¿Tienes alguna pregunta sobre {categories[activeTab - 1].label}?
              </Typography>
              <TextField
                fullWidth
                label="Tu pregunta"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                multiline
                rows={3}
                sx={{ mb: 2 }}
              />
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleSubmitQuestion}
                disabled={!newQuestion.trim()}
              >
                Enviar Pregunta
              </Button>
            </Paper>
          )}
        </>
      ) : (
        /* Pestaña de preguntas por responder (solo admin) */
        <Paper elevation={2} sx={{ mb: 4 }}>
          {unansweredQuestions.length > 0 ? (
            unansweredQuestions.map((question) => (
              <Box key={question.id} sx={{ p: 3, borderBottom: '1px solid', borderColor: 'divider' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Avatar sx={{ width: 24, height: 24, mr: 1 }}>
                    <PersonIcon fontSize="small" />
                  </Avatar>
                  <Typography variant="body2" color="text.secondary">
                    {question.askedBy} - {format(question.date, "PPP", { locale: es })}
                  </Typography>
                </Box>
                
                <Typography paragraph sx={{ fontWeight: 'medium', ml: 4 }}>
                  "{question.question}"
                </Typography>
                
                <TextField
                  fullWidth
                  label="Escribe tu respuesta..."
                  value={newAnswer}
                  onChange={(e) => setNewAnswer(e.target.value)}
                  multiline
                  rows={4}
                  sx={{ mb: 2 }}
                />
                
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                  <Button
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDelete(question.id, true)}
                    color="error"
                  >
                    Eliminar
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<CheckIcon />}
                    onClick={() => handleAnswerQuestion(question.id, newAnswer)}
                    disabled={!newAnswer.trim()}
                  >
                    Publicar Respuesta
                  </Button>
                </Box>
              </Box>
            ))
          ) : (
            <Box sx={{ p: 3, textAlign: 'center' }}>
              <Typography color="text.secondary">
                No hay preguntas pendientes de responder
              </Typography>
            </Box>
          )}
        </Paper>
      )}
    </Box>
  );
};

export default FAQComponent;