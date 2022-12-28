package com.api.eessefilme.dto;

import java.util.Date;

import javax.validation.constraints.NotBlank;

import com.api.eessefilme.entities.Comment;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommentDTO {

	private Long id;

	@NotBlank(message = "Can't be blank")
	private String description;
	
	private boolean spoiler;
	
	private Date dateComment;
	
	private UserDTO user;

	private MovieDTO movie;
	
	public CommentDTO(Comment comment) {
		this.id = comment.getId();
		this.description = comment.getDescription();
		this.spoiler = comment.isSpoiler();
		this.dateComment = comment.getDateComment();
		this.user = new UserDTO(comment.getUser());
		this.movie = new MovieDTO(comment.getMovie());
	}
}
