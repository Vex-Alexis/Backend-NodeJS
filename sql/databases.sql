CREATE DATABASE clinic;

USE clinic;

-- Crear la tabla de especialidades
CREATE TABLE especialidades (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_especialidad VARCHAR(255) NOT NULL
);

-- Insertar registros en la tabla de especialidades
INSERT INTO especialidades (nombre_especialidad) VALUES
('Medicina general'),
('Cardiología'),
('Medicina interna'),
('Dermatología'),
('Rehabilitación física'),
('Psicología'),
('Odontología'),
('Radiología');

-- Crear la tabla de doctores
CREATE TABLE doctores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    apellido VARCHAR(255) NOT NULL,
    cedula VARCHAR(255) NOT NULL,
    especialidad_id INT NOT NULL,
    consultorio VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    fecha_registro TIMESTAMP default CURRENT_TIMESTAMP,
    FOREIGN KEY (especialidad_id) REFERENCES especialidades(id)
);

-- Crear la tabla de pacientes
CREATE TABLE pacientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    apellido VARCHAR(255) NOT NULL,
    cedula VARCHAR(200) NOT NULL,
    edad INT NOT NULL,
    telefono VARCHAR(15) NOT NULL,
    email VARCHAR(255) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    fecha_registro TIMESTAMP default CURRENT_TIMESTAMP
);

-- Crear la tabla de citas
CREATE TABLE citas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    paciente_id INT NOT NULL,
    doctor_id INT NOT NULL,
    especialidad_id INT NOT NULL,
    fecha_hora TIMESTAMP default CURRENT_TIMESTAMP,
    FOREIGN KEY (paciente_id) REFERENCES pacientes(id),
    FOREIGN KEY (doctor_id) REFERENCES doctores(id),
    FOREIGN KEY (especialidad_id) REFERENCES especialidades(id)
);