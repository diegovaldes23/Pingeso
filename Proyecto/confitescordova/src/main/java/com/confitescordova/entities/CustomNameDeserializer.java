package com.confitescordova.entities;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;

import java.io.IOException;

public class CustomNameDeserializer extends JsonDeserializer<String> {
    @Override
    public String deserialize(JsonParser jp, DeserializationContext ctxt) throws IOException, JsonProcessingException {
        // Si el valor es un texto, lo deserializamos como un String
        if (jp.getCurrentToken().isScalarValue()) {
            return jp.getText();
        }

        // Si no es texto, podemos manejarlo de alguna forma, por ejemplo, retornando un valor predeterminado
        return "Nombre desconocido";
    }
}
