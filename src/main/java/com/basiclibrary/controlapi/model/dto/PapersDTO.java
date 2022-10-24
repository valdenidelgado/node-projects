package com.basiclibrary.controlapi.model.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.UUID;

@Data
@NoArgsConstructor
@EqualsAndHashCode
public class PapersDTO implements Serializable {

    public static final long serialVersionUID = 1L;

    private UUID id;
    private String title;
    private String category;
    private String summary;
    private String firstParagraph;
    private String body;
}
