package com.api.eessefilme.entities;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "tb_comment")
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Comment implements Serializable{

	@Id
	@GeneratedValue (strategy = GenerationType.IDENTITY)
	@EqualsAndHashCode.Include
	private Long id;
	
	@Column(nullable = false, columnDefinition = "TEXT")
	private String description;
	
	@Column(nullable = false)
	private boolean spoiler;
	
	@Column(nullable = false, columnDefinition = "TIMESTAMP WITHOUT TIME ZONE")
	private Date dateComment;
	
	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;
	
	@PrePersist
	public void prePersist() {
		this.spoiler = false;
		this.dateComment = new Date();
	}
}
