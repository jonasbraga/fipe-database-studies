CREATE TABLE marca (
    id 			SERIAL PRIMARY KEY,
    codigo 		INT,
    nome_marca 	VARCHAR(50) NOT NULL
);

CREATE TABLE modelo (
    id 					SERIAL PRIMARY KEY,
    codigo_modelo_fipe 	INT,
    nome_modelo 		VARCHAR(100),
    id_marca 		    INT NOT NULL,
    FOREIGN KEY (id_marca) REFERENCES marca(id)
);

CREATE TABLE ano (
    id 		SERIAL PRIMARY KEY,
    codigo 	VARCHAR(10),
    nome   	VARCHAR(25),
    ano 	INT
);

CREATE TABLE detalhes_veiculo (
    id 					SERIAL PRIMARY KEY,
    tipo_veiculo 		INT,
    valor 				FLOAT,
    marca				VARCHAR(50),
    modelo				VARCHAR(100),
    ano_modelo			INT,
    combustivel			VARCHAR(30),
    codigo_fipe 		VARCHAR(30),
    mes_referencia 		VARCHAR(50),
    sigla_combustivel 	CHAR(1),
    id_modelo 	    	INT NOT NULL,
    id_ano 		    	INT NOT NULL,
    FOREIGN KEY (id_modelo) REFERENCES modelo(id),
    FOREIGN KEY (id_ano) 	REFERENCES ano(id)
);

CREATE TABLE avaliacao_seguranca (
    id 												SERIAL PRIMARY KEY,
    imagem_veiculo 									VARCHAR(255),
    avaliacao_geral 								VARCHAR(50),
    avaliacao_capotagem								VARCHAR(50),
    chance_capotagem 								DOUBLE PRECISION,
    overall_front_crash_rating                     	VARCHAR(50),
    front_crash_driverside_rating                  	VARCHAR(50),
    front_crash_passengerside_rating               	VARCHAR(50),
    overall_side_crash_rating                      	VARCHAR(50),
    side_crash_driverside_rating                   	VARCHAR(50),
    side_crash_passengerside_rating                	VARCHAR(50),
    combined_side_barrier_and_pole_rating_front 	VARCHAR(50),
    combined_side_barrier_and_pole_rating_rear     	VARCHAR(50),
    side_barrier_rating_overall                    	VARCHAR(50),
    rollover_rating2                               	VARCHAR(50),
    rollover_possibility2                          	DOUBLE PRECISION,
    dynamic_tip_result                             	VARCHAR(50),
    side_pole_crash_rating                         	VARCHAR(50),
    nhtsa_electronic_stability_control             	VARCHAR(50),
    nhtsa_forward_collision_warning                	VARCHAR(50),
    nhtsa_lane_departure_warning                   	VARCHAR(50),
    complaints_count                               	INT,
    recalls_count                                  	INT,
    investigation_count                            	INT,
    model_year                                     	INT,
    make                                           	VARCHAR(50),
    model                                          	VARCHAR(50),
    vehicle_description                            	VARCHAR(100),
    vehicle_id                                     	INT,
    id_veiculo	 									INT NOT NULL,
    FOREIGN KEY (id_veiculo) REFERENCES detalhes_veiculo(id)
);
