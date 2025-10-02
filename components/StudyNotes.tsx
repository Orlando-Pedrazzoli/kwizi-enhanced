'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  StickyNote,
  Plus,
  Search,
  Edit3,
  Trash2,
  Save,
  X,
  Tag,
  Calendar,
  BookOpen,
  Filter,
  Star,
  ChevronDown,
  Palette,
  FileText,
} from 'lucide-react';

interface Note {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  color: string;
  createdAt: string;
  updatedAt: string;
  isStarred: boolean;
  relatedQuestions?: string[];
}

interface StudyNotesProps {
  darkMode: boolean;
  onClose: () => void;
}

export default function StudyNotes({ darkMode, onClose }: StudyNotesProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [showOnlyStarred, setShowOnlyStarred] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [newNote, setNewNote] = useState<Partial<Note>>({
    title: '',
    content: '',
    category: 'geral',
    tags: [],
    color: 'yellow',
    isStarred: false,
  });

  const noteColors = [
    {
      name: 'yellow',
      bg: 'bg-yellow-100 dark:bg-yellow-900/20',
      border: 'border-yellow-300 dark:border-yellow-700',
    },
    {
      name: 'blue',
      bg: 'bg-blue-100 dark:bg-blue-900/20',
      border: 'border-blue-300 dark:border-blue-700',
    },
    {
      name: 'green',
      bg: 'bg-green-100 dark:bg-green-900/20',
      border: 'border-green-300 dark:border-green-700',
    },
    {
      name: 'purple',
      bg: 'bg-purple-100 dark:bg-purple-900/20',
      border: 'border-purple-300 dark:border-purple-700',
    },
    {
      name: 'pink',
      bg: 'bg-pink-100 dark:bg-pink-900/20',
      border: 'border-pink-300 dark:border-pink-700',
    },
    {
      name: 'orange',
      bg: 'bg-orange-100 dark:bg-orange-900/20',
      border: 'border-orange-300 dark:border-orange-700',
    },
  ];

  const categories = [
    { id: 'geral', name: 'Geral', icon: '📝' },
    { id: 'web-development', name: 'Web Development', icon: '💻' },
    { id: 'ux-ui-design', name: 'UX/UI Design', icon: '🎨' },
    { id: 'data-analytics', name: 'Data Analytics', icon: '📊' },
    { id: 'cybersecurity', name: 'Cybersecurity', icon: '🔒' },
    { id: 'data-science', name: 'Data Science', icon: '🤖' },
    { id: 'devops', name: 'DevOps & Cloud', icon: '☁️' },
    { id: 'ai-engineering', name: 'AI Engineering', icon: '🧠' },
  ];

  // Carregar notas do localStorage
  useEffect(() => {
    const savedNotes = localStorage.getItem('studyNotes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  // Salvar notas no localStorage
  useEffect(() => {
    if (notes.length > 0 || localStorage.getItem('studyNotes')) {
      localStorage.setItem('studyNotes', JSON.stringify(notes));
    }
  }, [notes]);

  // Filtrar notas
  useEffect(() => {
    let filtered = [...notes];

    if (searchTerm) {
      filtered = filtered.filter(
        note =>
          note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
          note.tags.some(tag =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(note => note.category === selectedCategory);
    }

    if (selectedTag !== 'all') {
      filtered = filtered.filter(note => note.tags.includes(selectedTag));
    }

    if (showOnlyStarred) {
      filtered = filtered.filter(note => note.isStarred);
    }

    // Ordenar por data de atualização (mais recente primeiro)
    filtered.sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );

    setFilteredNotes(filtered);
  }, [notes, searchTerm, selectedCategory, selectedTag, showOnlyStarred]);

  const createNote = () => {
    if (!newNote.title || !newNote.content) return;

    const note: Note = {
      id: Date.now().toString(),
      title: newNote.title,
      content: newNote.content,
      category: newNote.category || 'geral',
      tags: newNote.tags || [],
      color: newNote.color || 'yellow',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isStarred: newNote.isStarred || false,
    };

    setNotes([note, ...notes]);
    setNewNote({
      title: '',
      content: '',
      category: 'geral',
      tags: [],
      color: 'yellow',
      isStarred: false,
    });
    setIsCreating(false);
  };

  const updateNote = () => {
    if (!editingNote) return;

    const updatedNotes = notes.map(note =>
      note.id === editingNote.id
        ? { ...editingNote, updatedAt: new Date().toISOString() }
        : note
    );

    setNotes(updatedNotes);
    setEditingNote(null);
  };

  const deleteNote = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta nota?')) {
      setNotes(notes.filter(note => note.id !== id));
    }
  };

  const toggleStar = (id: string) => {
    const updatedNotes = notes.map(note =>
      note.id === id ? { ...note, isStarred: !note.isStarred } : note
    );
    setNotes(updatedNotes);
  };

  const getAllTags = () => {
    const tagsSet = new Set<string>();
    notes.forEach(note => note.tags.forEach(tag => tagsSet.add(tag)));
    return Array.from(tagsSet);
  };

  const getColorClasses = (colorName: string) => {
    const color = noteColors.find(c => c.name === colorName) || noteColors[0];
    return color;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4'
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className='bg-white dark:bg-gray-800 rounded-3xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col'
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className='p-6 border-b border-gray-200 dark:border-gray-700'>
          <div className='flex items-center justify-between mb-4'>
            <div className='flex items-center gap-3'>
              <div className='p-3 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl'>
                <StickyNote className='w-6 h-6 text-white' />
              </div>
              <div>
                <h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
                  Minhas Notas de Estudo
                </h2>
                <p className='text-sm text-gray-600 dark:text-gray-400'>
                  Organize suas anotações e insights
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className='p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors'
            >
              ✕
            </button>
          </div>

          {/* Stats */}
          <div className='grid grid-cols-4 gap-3'>
            <div className='bg-blue-50 dark:bg-blue-900/20 p-3 rounded-xl'>
              <p className='text-xs text-gray-600 dark:text-gray-400'>
                Total de Notas
              </p>
              <p className='text-xl font-bold text-gray-900 dark:text-white'>
                {notes.length}
              </p>
            </div>
            <div className='bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-xl'>
              <p className='text-xs text-gray-600 dark:text-gray-400'>
                Favoritas
              </p>
              <p className='text-xl font-bold text-yellow-600 dark:text-yellow-400'>
                {notes.filter(n => n.isStarred).length}
              </p>
            </div>
            <div className='bg-purple-50 dark:bg-purple-900/20 p-3 rounded-xl'>
              <p className='text-xs text-gray-600 dark:text-gray-400'>
                Categorias
              </p>
              <p className='text-xl font-bold text-purple-600 dark:text-purple-400'>
                {new Set(notes.map(n => n.category)).size}
              </p>
            </div>
            <div className='bg-green-50 dark:bg-green-900/20 p-3 rounded-xl'>
              <p className='text-xs text-gray-600 dark:text-gray-400'>Tags</p>
              <p className='text-xl font-bold text-green-600 dark:text-green-400'>
                {getAllTags().length}
              </p>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className='p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50'>
          <div className='flex flex-col lg:flex-row gap-4'>
            {/* Search */}
            <div className='flex-1'>
              <div className='relative'>
                <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400' />
                <input
                  type='text'
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  placeholder='Buscar notas...'
                  className='w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>
            </div>

            {/* Filters */}
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className='px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white'
            >
              <option value='all'>Todas Categorias</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.icon} {cat.name}
                </option>
              ))}
            </select>

            <select
              value={selectedTag}
              onChange={e => setSelectedTag(e.target.value)}
              className='px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white'
            >
              <option value='all'>Todas Tags</option>
              {getAllTags().map(tag => (
                <option key={tag} value={tag}>
                  #{tag}
                </option>
              ))}
            </select>

            <button
              onClick={() => setShowOnlyStarred(!showOnlyStarred)}
              className={`px-4 py-2 rounded-xl font-medium transition-all ${
                showOnlyStarred
                  ? 'bg-yellow-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              <Star className='w-5 h-5 inline mr-1' />
              Favoritas
            </button>

            <button
              onClick={() => setIsCreating(true)}
              className='px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:shadow-lg transition-all'
            >
              <Plus className='w-5 h-5 inline mr-1' />
              Nova Nota
            </button>
          </div>
        </div>

        {/* Notes Grid */}
        <div className='flex-1 overflow-y-auto p-6'>
          {filteredNotes.length === 0 ? (
            <div className='text-center py-12'>
              <FileText className='w-16 h-16 text-gray-400 mx-auto mb-4' />
              <p className='text-lg font-medium text-gray-600 dark:text-gray-400'>
                Nenhuma nota encontrada
              </p>
              <p className='text-sm text-gray-500 dark:text-gray-500 mt-2'>
                Crie sua primeira nota para começar a organizar seus estudos!
              </p>
            </div>
          ) : (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
              {filteredNotes.map(note => {
                const colorClasses = getColorClasses(note.color);
                const category = categories.find(c => c.id === note.category);

                return (
                  <motion.div
                    key={note.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ y: -4 }}
                    className={`${colorClasses.bg} ${colorClasses.border} border-2 rounded-2xl p-4 relative group cursor-pointer transition-all`}
                    onClick={() => setEditingNote(note)}
                  >
                    {/* Star Button */}
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        toggleStar(note.id);
                      }}
                      className='absolute top-2 right-2 p-1 hover:bg-white/20 rounded-lg transition-colors'
                    >
                      {note.isStarred ? (
                        <Star className='w-4 h-4 text-yellow-500 fill-yellow-500' />
                      ) : (
                        <Star className='w-4 h-4 text-gray-400' />
                      )}
                    </button>

                    {/* Category Badge */}
                    <div className='flex items-center gap-2 mb-2'>
                      <span className='text-lg'>{category?.icon}</span>
                      <span className='text-xs font-medium text-gray-600 dark:text-gray-400'>
                        {category?.name}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className='font-bold text-gray-900 dark:text-white mb-2 line-clamp-2'>
                      {note.title}
                    </h3>

                    {/* Content Preview */}
                    <p className='text-sm text-gray-700 dark:text-gray-300 line-clamp-4 mb-3'>
                      {note.content}
                    </p>

                    {/* Tags */}
                    {note.tags.length > 0 && (
                      <div className='flex flex-wrap gap-1 mb-3'>
                        {note.tags.slice(0, 3).map(tag => (
                          <span
                            key={tag}
                            className='px-2 py-0.5 text-xs bg-white/50 dark:bg-gray-900/50 rounded-full'
                          >
                            #{tag}
                          </span>
                        ))}
                        {note.tags.length > 3 && (
                          <span className='text-xs text-gray-500'>
                            +{note.tags.length - 3}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Date */}
                    <p className='text-xs text-gray-500 dark:text-gray-500'>
                      {new Date(note.updatedAt).toLocaleDateString('pt-BR')}
                    </p>

                    {/* Actions */}
                    <div className='absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1'>
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          setEditingNote(note);
                        }}
                        className='p-1.5 bg-white/70 dark:bg-gray-800/70 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-colors'
                      >
                        <Edit3 className='w-3 h-3 text-gray-600 dark:text-gray-400' />
                      </button>
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          deleteNote(note.id);
                        }}
                        className='p-1.5 bg-white/70 dark:bg-gray-800/70 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-colors'
                      >
                        <Trash2 className='w-3 h-3 text-red-600 dark:text-red-400' />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

        {/* Create/Edit Modal */}
        <AnimatePresence>
          {(isCreating || editingNote) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4'
              onClick={() => {
                setIsCreating(false);
                setEditingNote(null);
              }}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className='bg-white dark:bg-gray-800 rounded-2xl w-full max-w-2xl p-6'
                onClick={e => e.stopPropagation()}
              >
                <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-4'>
                  {editingNote ? 'Editar Nota' : 'Nova Nota'}
                </h3>

                <div className='space-y-4'>
                  {/* Title */}
                  <input
                    type='text'
                    value={editingNote ? editingNote.title : newNote.title}
                    onChange={e =>
                      editingNote
                        ? setEditingNote({
                            ...editingNote,
                            title: e.target.value,
                          })
                        : setNewNote({ ...newNote, title: e.target.value })
                    }
                    placeholder='Título da nota...'
                    className='w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />

                  {/* Content */}
                  <textarea
                    value={editingNote ? editingNote.content : newNote.content}
                    onChange={e =>
                      editingNote
                        ? setEditingNote({
                            ...editingNote,
                            content: e.target.value,
                          })
                        : setNewNote({ ...newNote, content: e.target.value })
                    }
                    placeholder='Conteúdo da nota...'
                    rows={8}
                    className='w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none'
                  />

                  <div className='flex gap-4'>
                    {/* Category */}
                    <select
                      value={
                        editingNote ? editingNote.category : newNote.category
                      }
                      onChange={e =>
                        editingNote
                          ? setEditingNote({
                              ...editingNote,
                              category: e.target.value,
                            })
                          : setNewNote({ ...newNote, category: e.target.value })
                      }
                      className='flex-1 px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white'
                    >
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>
                          {cat.icon} {cat.name}
                        </option>
                      ))}
                    </select>

                    {/* Color */}
                    <div className='flex gap-2'>
                      {noteColors.map(color => (
                        <button
                          key={color.name}
                          onClick={() =>
                            editingNote
                              ? setEditingNote({
                                  ...editingNote,
                                  color: color.name,
                                })
                              : setNewNote({ ...newNote, color: color.name })
                          }
                          className={`w-8 h-8 rounded-lg ${color.bg} ${
                            color.border
                          } border-2 ${
                            (editingNote
                              ? editingNote.color
                              : newNote.color) === color.name
                              ? 'ring-2 ring-blue-500'
                              : ''
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Tags */}
                  <input
                    type='text'
                    value={
                      editingNote
                        ? editingNote.tags?.join(', ')
                        : newNote.tags?.join(', ')
                    }
                    onChange={e => {
                      const tags = e.target.value
                        .split(',')
                        .map(t => t.trim())
                        .filter(t => t);
                      editingNote
                        ? setEditingNote({ ...editingNote, tags })
                        : setNewNote({ ...newNote, tags });
                    }}
                    placeholder='Tags (separadas por vírgula)...'
                    className='w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>

                {/* Actions */}
                <div className='flex justify-end gap-3 mt-6'>
                  <button
                    onClick={() => {
                      setIsCreating(false);
                      setEditingNote(null);
                    }}
                    className='px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors'
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={editingNote ? updateNote : createNote}
                    className='px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:shadow-lg transition-all'
                  >
                    {editingNote ? 'Salvar' : 'Criar'}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
